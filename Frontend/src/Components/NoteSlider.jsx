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
            
            
        </div>
    )
}

export default NoteSlider