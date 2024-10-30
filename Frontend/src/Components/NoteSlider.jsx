import React from 'react'
import "../styles/NoteSlider.css"
import NoteCard from './NoteCard'
import ConvertDate from '../Utils/ConvertDate';

function NoteSlider({ notes }) {


    return (
        <div className="scrollmenu d-flex">
            {
                notes?.map((item, index) => {

                    const expectedCompletionDate = new Date(item.expectedCompletion);
                    const formattedDate = expectedCompletionDate.toLocaleDateString();
                    const formattedTime = expectedCompletionDate.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                   
                    return <NoteCard
                        Title={item.title}
                        Content={item.summary}
                        // CreatedDate={DateAndTime}
                        key={index}
                        id={item.noteID}
                        ITime={formattedTime}
                        IDate={formattedDate}
                        createdBy={item.createdBy}
                        updatedBy={item.updatedBy}

                    />
                })

            }
            {(notes?.length === 0) && <p>There are no recent notes to show!</p>}

        </div>
    )
}

export default NoteSlider