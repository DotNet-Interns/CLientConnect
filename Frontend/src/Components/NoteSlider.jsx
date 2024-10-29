import React from 'react'
import "../styles/NoteSlider.css"
import NoteCard from './NoteCard'

function NoteSlider() {
    return (
        <div className="scrollmenu">
            <NoteCard id={1} />
            <NoteCard id={2} />
            <NoteCard id={3} />
            <NoteCard id={4} />
            <NoteCard id={5} />
            <NoteCard id={6} />
            <NoteCard id={7} />
            <NoteCard id={8} />
            <NoteCard id={9} />
            <NoteCard id={10} />
            <NoteCard id={11} />
            <NoteCard id={12} />
            <NoteCard id={13} />
            <NoteCard id={14} />
        </div>
    )
}

export default NoteSlider