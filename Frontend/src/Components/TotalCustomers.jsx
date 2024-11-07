import React from 'react'

function TotalCustomers({totalCustomers}) {
  return (
    <div>
        <h2 >
            Total Customers
        </h2>
        <h3 className='text-secondary'>{totalCustomers}</h3>
    </div>
  )
}

export default TotalCustomers