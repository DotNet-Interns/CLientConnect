import { useEffect, useRef, useState } from "react";
import "../styles/NoteCard.css";
import { CiEdit } from "react-icons/ci";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdCancelPresentation } from "react-icons/md";
import { BiUndo } from "react-icons/bi";
import axios from "axios";
import * as cookie from "../Utils/cookie";
import { useUserInfo } from "../Contexts/User";

const server = import.meta.env.VITE_SERVER;

function NoteCard({ IDate, ITime, Title = "", Content = "", id, createdBy = "", updatedBy = "", initialStatus = 0, onChangingAnything = '', allowEdit = false }) {

    // console.log(`updatedby ${updatedBy}`)
    const { contextUser } = useUserInfo();


    const [noteCard, setNoteCard] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(Title);
    const [updatedTime, setUpdatedTime] = useState(`${IDate}T${ITime}`);
    const [editedContent, setEditedContent] = useState(Content);
    const [editedDateTime, setEditedDateTime] = useState(`${IDate} ${ITime}`);
    const noteCardRef = useRef(null);
    const [authToken, setAuthToken] = useState(cookie.getCookie("Auth_Token"));
    const [errors, setErrors] = useState({});
    const statusEnum = {
        0: "Pending",
        1: "Completed",
        2: "Cancelled",
    };

    const validateFields = () => {
        const newErrors = {};

        if (!editedTitle.trim()) newErrors.title = "Title cannot be empty.";
        if (!editedContent.trim()) newErrors.content = "Content cannot be empty.";

        // Explicitly check for an empty date string
        if (!updatedTime || updatedTime.trim() === "") {
            newErrors.date = "Date and time cannot be empty.";
        } else {
            const now = new Date();
            const inputDate = new Date(updatedTime);
            if (inputDate <= now) {
                newErrors.date = "Expected completion date must be in the future.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const saveChanges = async () => {
        if (!validateFields()) return;

        const updatedNote = {
            title: editedTitle,
            summary: editedContent,
            expectedCompletion: updatedTime,
            updatedBy: contextUser?.userID,
            noteID: id,
        };


        try {
            const response = await axios.put(`${server}/api/Notes`, updatedNote, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            console.log('Note updated successfully:', response.data);
            setIsEditing(false);
            setEditedTitle(updatedNote.title);
            setEditedContent(updatedNote.summary);
            setEditedDateTime(updatedNote.expectedCompletion);
            onChangingAnything();
        } catch (error) {
            console.error('Error updating note:', error.response?.data || error.message);
        }
    };

    const handleNoteCardClick = async () => {


        try {
            const Auth_Token = cookie.getCookie("Auth_Token")
            const response = await axios.get(`${server}/api/ClientInteraction/note/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${Auth_Token}`
                    }
                }
            );
            console.log(response);

        } catch (error) {
            console.log(error);
        }

        setNoteCard(true);
        document.getElementById("blurer").style.display = "block";
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleRestore = () => {
        setEditedTitle(Title);
        setEditedContent(Content);
        setUpdatedTime(`${IDate}T${ITime}`);
        setIsEditing(false);
    };

    const handleClickOutside = (event) => {
        if (noteCardRef.current && !noteCardRef.current.contains(event.target)) {
            setNoteCard(false);
            document.getElementById("blurer").style.display = "none";
            setIsEditing(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCancel = async () => {
        const data = { status: 2 };
        try {
            const response = await axios.put(`${server}/api/Notes/UpdateNoteStatus/${id}`, data, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            onChangingAnything();
        } catch (error) {
            console.error(error);
        }
    };

    const handleComplete = async () => {
        const data = { status: 1 };
        try {
            const response = await axios.put(`${server}/api/Notes/UpdateNoteStatus/${id}`, data, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            onChangingAnything();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div onClick={handleNoteCardClick} className='note-card-container pointer'>
                <h3 className='note-card-title'>{Title}</h3>
                <p className="card-text text-secondary mb-3 text-truncate" style={{ maxWidth: '100%' }}>
                    {Content}
                </p>
                <p className="note-card-date">Expected: {(!IDate) ? "N/A" : editedDateTime}</p>
                <span
                    className={`badge rounded-pill mx-auto ${initialStatus === 0 ? 'text-secondary bg-warning' :
                        initialStatus === 1 ? 'bg-success-subtle text-success' :
                            'bg-danger-subtle text-danger'
                        }`}
                >
                    {statusEnum[initialStatus]}
                </span>
            </div>

            {noteCard && (
                <div id="Note-Pop-up" ref={noteCardRef} className="note-card-popup">
                    {isEditing && <span className="me-auto my-2 fst-italic text-secondary">Update Details</span>}
                    <h3 className="note-card-title h3 text-light text-capitalize">
                        {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    placeholder="Title"
                                    className="edit-input-title"
                                />
                                {errors.title && <p className="error-text">{errors.title}</p>}
                            </>
                        ) : (
                            editedTitle
                        )}
                    </h3>
                    <p className="popup-content border p-3 rounded-2">
                        {isEditing ? (
                            <>
                                <textarea
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    rows="10"
                                    placeholder="Summary"
                                    className="edit-input-content"
                                />
                                {errors.content && <p className="error-text">{errors.content}</p>}
                            </>
                        ) : (
                            editedContent
                        )}
                    </p>
                    {
                        IDate && ITime &&
                        <p className="popup-date m-0 d-flex">
                            Due : {" "}
                            {isEditing ? (
                                <>
                                    <input
                                        type="datetime-local"
                                        value={updatedTime}
                                        onChange={(e) => setUpdatedTime(e.target.value)}
                                        className="edit-input"
                                    />
                                    {errors.date && <p className="error-text">{errors.date}</p>}
                                </>
                            ) : (

                                <span className="text-danger">{editedDateTime}</span>
                            )}
                        </p>}
                    <p className="popup-date m-0 d-flex">
                        Created by : {createdBy}
                    </p>
                    {updatedBy != null && updatedBy !== "Null data" && (
                        <p className="popup-date mt-0 d-flex">
                            Updated by : {updatedBy}
                        </p>
                    )}
                    {

                        allowEdit &&
                        <div className="popup-actions d-flex justify-content-start align-items-center gap-2 mt-2">
                            {isEditing ? (
                                <button onClick={handleRestore} className="restore-button bg-warning border-0 shadow-lg h4 rounded-3 d-flex justify-content-center align-items-center p-1">
                                    <BiUndo />
                                </button>
                            ) : (
                                <button onClick={handleEdit} className="edit-button bg-primary-subtle shadow-lg h5 border-0 rounded-3 d-flex justify-content-center align-items-center p-2 gap-1">
                                    <CiEdit />
                                    Edit
                                </button>
                            )}
                            {!isEditing && initialStatus === 0 && (
                                <div className="d-flex gap-1">
                                    <button onClick={handleComplete} className="status-button border-0 d-flex shadow-lg h5 rounded-3 justify-content-center align-items-center p-2 gap-1 bg-success-subtle">
                                        <IoCheckmarkDone />
                                        Complete
                                    </button>
                                    <button onClick={handleCancel} className="status-button border-0 d-flex shadow-lg h5 rounded-3 justify-content-center align-items-center p-2 gap-1 bg-danger-subtle">
                                        <MdCancelPresentation />
                                        Cancel
                                    </button>
                                </div>
                            )}
                            {isEditing && (
                                <button className="status-button border-0 bg-primary-subtle d-flex justify-content-center align-content-center shadow-lg h4 rounded-1 p-1" onClick={() => saveChanges()}>
                                    Save
                                </button>
                            )}

                        </div>
                    }
                </div>
            )}

            <div id="blurer"></div>
        </>
    );
}

export default NoteCard;
