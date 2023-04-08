import React from 'react'
import Errors4xx from './Reports/Errors4xx'
import RecentErrors from './Reports/RecentErrors'
import TopEndpoint from './Reports/TopEndpoint'
import TopUsers from './Reports/TopUsers'
import UniqueUsers from './Reports/UniqueUsers'

function Dashboard({accessToken, refreshToken}) {
  return (
    <div>
      <Errors4xx />
      <RecentErrors />
      <TopEndpoint />
      <TopUsers />
      <UniqueUsers />
    </div>
  )
}

export default Dashboard
