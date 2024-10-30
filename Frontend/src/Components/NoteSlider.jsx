import React from 'react'
import "../styles/NoteSlider.css"
import NoteCard from './NoteCard'
import ConvertDate from '../Utils/ConvertDate';

function NoteSlider({notes}) {
    
    
    return (
        <div className="scrollmenu">
            {
                notes?.map((item,index)=>{
                    let DateAndTime  = ConvertDate(item.createdAt)
                    return <NoteCard Title={item.title} Content={item.summary} CreatedDate={DateAndTime}  key={index} />
                })
                
            }
            {(notes.length === 0) && <p>There are no recent notes to show!</p>}
            
        </div>
    )
}

export default NoteSlider