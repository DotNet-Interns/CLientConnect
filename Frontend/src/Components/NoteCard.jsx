import { useEffect, useRef, useState } from "react";
import "../styles/NoteCard.css";
import { CiEdit } from "react-icons/ci";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdCancelPresentation } from "react-icons/md";
const server = import.meta.env.VITE_SERVER;
import { BiUndo } from "react-icons/bi"; // Add an icon for the Restore button
import axios from "axios";
import * as cookie from "../Utils/cookie";


function NoteCard({ Title = "", Content = "", IDate = "", ITime = "", id, createdBy="",updatedBy="", initialStatus = 0, onStatusChange }) {

    const [noteCard, setNoteCard] = useState(false);
    const [status, setStatus] = useState(initialStatus);
    const [isEditing, setIsEditing] = useState(false); // Track if in edit mode
    const [editedTitle, setEditedTitle] = useState(Title);
    const [updatedTime,setUpdatedTime]=useState(null)
    const [editedContent, setEditedContent] = useState(Content);
    const [editedDateTime, setEditedDateTime] = useState(`${IDate} ${ITime}`);
    const noteCardRef = useRef(null);
    const [authToken, setAuthToken] = useState(cookie.getCookie("Auth_Token"));
    const saveChanges = async () => {
        alert(updatedTime)
        // Create the updated note object
        const updatedNote = {
            title: editedTitle,
            summary: editedContent,
            expectedCompletion: updatedTime,
            createdBy: createdBy, 
            updatedBy: 3, 
            noteID: id,  
        };
    
        try {
            const response = await axios.put(`${server}/api/Notes`, updatedNote, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            console.log('Note updated successfully:', response.data);
            
            // After saving, you may want to close the edit mode and update the local state
            setIsEditing(false);
            setEditedTitle(updatedNote.title);
            setEditedContent(updatedNote.content);
            setEditedDateTime(updatedNote.expectedDateTime);
            
        } catch (error) {
            console.error('Error updating note:', error.response?.data || error.message); // Handle errors
        }
    };
    


    const handleNoteCardClick = () => {
        setNoteCard(true);
        document.getElementById("blurer").style.display = "block";
    };

    const handleEdit = () => {
        setIsEditing(true); // Enable edit mode
    };

    const handleRestore = () => {
        setEditedTitle(Title); // Reset to original values
        setEditedContent(Content);
        setEditedDateTime(`${IDate} ${ITime}`);
        setIsEditing(false); // Exit edit mode
    };

    const handleStatusChange = () => {
        const newStatus = status === 0 ? 1 : 0; 
        setStatus(newStatus);
        if (onStatusChange) {
            onStatusChange(id, newStatus); 
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (noteCardRef.current && !noteCardRef.current.contains(event.target)) {
                setNoteCard(false);
                document.getElementById("blurer").style.display = "none";
                setIsEditing(false); // Exit edit mode if clicked outside
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const onEdit=()=>{

    }

    return (
        <>
            <div onClick={handleNoteCardClick} className='note-card-container pointer'>
                <h3 className='note-card-title'>{Title}</h3>
                <p className="note-card-content">{Content}</p>
                <p className="note-card-date">Expected: {editedDateTime}</p> {/* Display combined date and time */}

            </div>

            {noteCard && (
                <div id="Note-Pop-up" ref={noteCardRef} className="note-card-popup">
                    {isEditing && <span className="text-start">Update Title</span>}
                    <h3 className="note-card-title h3 text-light text-capitalize">
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                placeholder="Title"
                                className="edit-input-title"
                            />
                        ) : (
                            editedTitle
                        )}
                    </h3>
                    <p className="popup-content border p-3 rounded-2">
                        {isEditing ? (
                            <>Update Summary
                                <textarea
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    rows="10"
                                    placeholder="Summary"
                                    className="edit-input-content"
                                />
                            </>
                        ) : (
                            editedContent
                        )}
                    </p>
                    <p className="popup-date text-start p-1 text-dark rounded-1  bg-danger-subtle ">
                        Expected:{" "}
                        {isEditing ? (
                            <input
                                type="datetime-local" // Use datetime-local for combined date and time input
                                value={updatedTime}
                                onChange={(e) => setUpdatedTime(e.target.value)}
                                className="edit-input"
                            />
                        ) : (
                            editedDateTime
                        )}
                    </p>
                    <p className="popup-date m-0 d-flex">
                        Created by :&nbsp;
                        {createdBy}
                       
                    </p>
                    <p className="popup-date mt-1  d-flex">
                       
                       
                        Updated by :&nbsp;
                        {updatedBy}
                    </p>
                    <div className="popup-actions d-flex justify-content-center align-items-center gap-2 ">
                        {isEditing ? (
                            <button onClick={handleRestore} className="restore-button bg-warning border-0 shadow-lg h4 rounded-3 d-flex justify-content-center align-items-center p-1">
                                <BiUndo />
                            </button>
                        ) : (
                            <button onClick={handleEdit} className="edit-button bg-primary-subtle shadow-lg h5 border-0 rounded-3 d-flex justify-content-center align-items-center p-2 gap-1 ">
                                <CiEdit />
                                Edit
                            </button>
                        )}
                        {!isEditing && (
                            <button
                                onClick={handleStatusChange}
                                className={`status-button border-0 d-flex shadow-lg h5 rounded-3 justify-content-center align-items-center p-2 gap-1 ${status === 0 ? 'bg-success-subtle' : 'bg-danger-subtle'}`}
                            >
                                {status === 0 ? <IoCheckmarkDone /> : <MdCancelPresentation />}
                                {status === 0 ? `Complete` : `Cancel`}
                            </button>
                        )}
                        {isEditing && 
                            <button className="status-button border-0 bg-primary-subtle d-flex justify-content-center align-content-center shadow-lg h4 rounded-1 p-1 " onClick={()=>saveChanges()}>
                                Save   
                            </button>
                        }

                    </div>
                </div>
            )}

            <div id="blurer"></div>
        </>
    );
}

export default NoteCard;
