import React from 'react'

function Note() {
    return (
        <>
            <div style={{ display: noteCard ? "block" : "none" }} id="Note-Pop-up" ref={noteCardRef} >
                Hello World
            </div>

            <div id="blurer"></div>
        </>
    )
}

export default Note