import React from 'react'

function CompletedNotesThisMonth({completedNotes}) {
  return (
    <div>
        <h2>
            Completed Notes This Month
        </h2>
        <h1>{completedNotes}</h1>
    </div>
  )
}

export default CompletedNotesThisMonth