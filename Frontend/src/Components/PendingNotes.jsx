import React from 'react'

function PendingNotes({pendingNotes}) {
  return (
    <div>
        <h2>
            Pending Notes
        </h2>
        <h1>{pendingNotes}</h1>
    </div>
  )
}

export default PendingNotes