import React from 'react'
import Errors4xx from './Reports/Errors4xx'
import RecentErrors from './Reports/RecentErrors'
import TopEndpoint from './Reports/TopEndpoint'
import TopUsers from './Reports/TopUsers'
import UniqueUsers from './Reports/UniqueUsers'
import Logout from './Logout'

function Dashboard({accessToken, refreshToken}) {
  return (
    <div>
      <Logout />
      <Errors4xx accessToken={accessToken} refreshToken={refreshToken} />
      <RecentErrors accessToken={accessToken} refreshToken={refreshToken}/>
      <TopEndpoint accessToken={accessToken} refreshToken={refreshToken} />
      <TopUsers accessToken={accessToken} refreshToken={refreshToken} />
      <UniqueUsers accessToken={accessToken} refreshToken={refreshToken} />
    </div>
  )
}

export default Dashboard
