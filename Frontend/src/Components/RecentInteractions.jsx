import React from 'react'

function RecentInteractions({recentInteractions}) {
  return (
    <div>
        <h2>
            Recent Interactions
        </h2>
        <h1>{recentInteractions}</h1>
    </div>
  )
}

export default RecentInteractions