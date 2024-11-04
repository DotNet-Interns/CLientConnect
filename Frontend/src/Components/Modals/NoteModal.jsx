import React, { useState, useEffect } from 'react';
import "../../styles/CustomModal.css";
import axios from 'axios';
import * as cookie from "../../Utils/cookie";

function NoteModal({ isOpen, onClose, noteData = {}, mode = "add", createdBy, customerId }) {
    const [authToken, setAuthToken] = useState(cookie.getCookie("Auth_Token"));
    const [title, setTitle] = useState(noteData.title || "");
    const [summary, setSummary] = useState(noteData.summary || "");
    const [status, setStatus] = useState(noteData.status || "Pending");
    const [expectedCompletion, setExpectedCompletion] = useState(noteData.expectedCompletion || "");

    useEffect(() => {
        if (noteData) {
            setTitle(noteData.title || "");
            setSummary(noteData.summary || "");
            setStatus(noteData.status || "Pending");
            setExpectedCompletion(noteData.expectedCompletion || null);
        }
    }, [noteData]);

    const handleSave = async () => {
        const addData = { title, summary, expectedCompletion, createdBy, createdFor: customerId };
        const updateData = { title, summary, status, expectedCompletion };

        try {
            const config = { headers: { Authorization: `Bearer ${authToken}` } };
            const response = mode === "add"
                ? await axios.post(`http://172.20.68.11:5100/api/Notes`, addData, config)
                : await axios.put(`http://172.20.68.11:5100/api/Notes/${noteData.noteID}`, updateData, config);

            console.log(`Note ${mode === "add" ? "created" : "updated"} successfully`, response.data);
        } catch (error) {
            console.log(`Unable to ${mode} note:`, error.response ? error.response.data : error.message);
            alert(`Unable to ${mode} note. ${error}`);
        }
        onClose();
    };

    const handleDelete = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${authToken}` } };
            await axios.delete(`http://172.20.68.11:5100/api/Notes/${noteData.noteID}`, config);
            console.log("Note deleted successfully");
        } catch (error) {
            console.log("Unable to delete note:", error.response ? error.response.data : error.message);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>X</button>
                <h3 className="modal-title">{mode === "add" ? "Add Note" : "Update Note"}</h3>

                <div className="modal-body">
                    <label className="input-label">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                    />
                    <label className="input-label">Summary</label>
                    <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className="input-field"
                        rows="3"
                    />
                    {mode !== "add" && (
                        <>
                            <label className="input-label">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="input-field"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="InProgress">In Progress</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </>
                    )}
                    <label className="input-label">Expected Completion</label>
                    <input
                        type="datetime-local"
                        value={expectedCompletion}
                        onChange={(e) => setExpectedCompletion(e.target.value)}
                        className="input-field"
                    />
                </div>

                <div className="modal-footer">
                    <button className="modal-button cancel-button" onClick={onClose}>Cancel</button>
                    {mode === "delete" ? (
                        <button className="modal-button action-button" onClick={handleDelete}>Delete</button>
                    ) : (
                        <button className="modal-button action-button" onClick={handleSave}>Save</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NoteModal;
