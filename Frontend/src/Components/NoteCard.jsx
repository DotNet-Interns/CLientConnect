import { useEffect, useRef, useState } from "react";
import "../styles/NoteCard.css";

function NoteCard({ Title = "", Content = "", IDate = "", id, initialStatus = 0, onEdit, onStatusChange }) {
    const [noteCard, setNoteCard] = useState(false);
    const [status, setStatus] = useState(initialStatus);
    const noteCardRef = useRef(null);

    const handleNoteCardClick = () => {
        setNoteCard(true);
        document.getElementById("blurer").style.display = "block";
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit(id); // Call the edit function passed down as prop
        }
    };

    const handleStatusChange = () => {
        const newStatus = status === 0 ? 1 : 0; // Toggle status
        setStatus(newStatus);
        if (onStatusChange) {
            onStatusChange(id, newStatus); // Call the status change function passed down as prop
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (noteCardRef.current && !noteCardRef.current.contains(event.target)) {
                setNoteCard(false);
                document.getElementById("blurer").style.display = "none";
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div onClick={handleNoteCardClick} className='note-card-container pointer'>
                <h3 className='note-card-title'>{Title}</h3>
                <p className="note-card-content">{Content}</p>
                <p className="note-card-date">Interaction Date: {IDate}</p>
            </div>

            {noteCard && (
                <div id="Note-Pop-up" ref={noteCardRef} className="note-card-popup">
                    <h3 className="note-card-title h3 text-light text-capitalize">{Title}</h3>
                    <p className="popup-content border  p-3 rounded-2">{Content}</p>
                    <p className="popup-date">Interaction Date: {IDate}</p>
                    <div className="popup-actions">
                        <button onClick={handleEdit} className="edit-button">Edit</button>
                        <button onClick={handleStatusChange} className="status-button">
                            {status === 0 ? 'Mark as Complete' : 'Mark as Incomplete'}
                        </button>
                    </div>
                </div>
            )}

            <div id="blurer"></div>
        </>
    );
}

export default NoteCard;
