function NoteCard({Title,Content,IDate}) {
    return (
        <div className='container w-25 notes rounded-2 shadow-sm d-flex flex-column justify-content-start align-align-items-center p-2 gap-2 pointer'>
            <h3 className='bg-secondary rounded-1 text-light p-1'>Title</h3>
            <div className='bg-secondary rounded-1 text-light p-1'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, excepturi? Magnam asperiores voluptatum voluptatibus, libero expedita blanditiis vel accusamus vero.
            </div>
            <p>Interaction Date :12/5/2023</p>
        </div>
    );
}

export default NoteCard