import React from 'react'

function CustomerInteractionsThisMonth({customerInteractionsThisMonth}) {
  return (
    <div>
        <h2>
            Your Interactions This Month
        </h2>
        <h1>{customerInteractionsThisMonth}</h1>
    </div>
  )
}

export default CustomerInteractionsThisMonth