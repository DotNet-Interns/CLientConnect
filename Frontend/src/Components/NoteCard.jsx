import { useEffect, useRef, useState } from "react";
import "../styles/NoteCard.css"

function NoteCard({ Title, Content, IDate ,id }) {
    const [noteCard, setNoteCard] = useState(false);
    const noteCardRef = useRef(null);

    console.log(id);
    
    const handleNoteCardClick = () => {
        setNoteCard(true);
        document.getElementById("blurer").style.display = "block"
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!noteCardRef.current.contains(event.target)) {
                setNoteCard(false);
                document.getElementById("blurer").style.display = "none"
                console.log("Clicked");
                
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <>
            <div onClick={handleNoteCardClick} style={{display : "inline-block"}} className='pointer note col-3 p-3 m-3'>
                <h3 className='bg-secondary rounded-1 text-light p-1'>Title</h3>
                <p className="noteContent">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero dicta modi, eveniet pariatur placeat rem eos ducimus iusto ex optio, voluptate alias quo, quaerat corporis! Tenetur animi repellendus explicabo quia! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam a quos nihil sit voluptates ad tenetur, fugiat eum dolore quia modi rerum saepe quasi, veritatis consequuntur voluptatem voluptate facilis minus?
                </p>
                <p>Interaction Date :12/5/2023</p>
            </div>

            <div style={{display : noteCard ? "block" : "none"}} id="Note-Pop-up" ref={noteCardRef} >
                Hello World
            </div>

            <div id="blurer"></div>
        </>
    );
}

export default NoteCard