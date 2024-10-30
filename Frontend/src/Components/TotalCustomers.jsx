import React from 'react'

function TotalCustomers({totalCustomers}) {
  return (
    <div>
        <h2>
            Total Customers
        </h2>
        <h1>{totalCustomers}</h1>
    </div>
  )
}

export default TotalCustomers