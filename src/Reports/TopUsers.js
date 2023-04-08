import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'


function TopUsers({accessToken, refreshToken}) {

  const [topUsers, setTopUsers] = React.useState([])

  useEffect(() => {
    try {
      document.getElementById('errorTopUsers').innerHTML = ''
      const result = async () => {
        const res = await axios.get('http://localhost:6001/api/v1/recentErrors',{
          headers: {
            'auth-token-access': accessToken,
            'auth-token-refresh': refreshToken
        }})
        // Find which user has the most reports
        // and get all those reports
        // sort by date
        const topUsers = res.data.reduce((acc, error) => {
          const key = `${error.username}`
          if (acc[key]) {
            acc[key]++
          } else {
            acc[key] = 1
          }
          return acc
        }, {})
        const topUsersArray = Object.keys(topUsers).map(key => {
          const [username] = key.split(' ')
          return {username, count: topUsers[key]}
        }
        )
        topUsersArray.sort((a, b) => b.count - a.count)
        setTopUsers(topUsersArray)
      }
      result()
    } catch (err) {
      document.getElementById('errorTopUsers').innerHTML = err.response.data
    }
  }, [accessToken, refreshToken])

  return (
    <div>
      <h1>Top Users</h1>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Count</th>
              </tr>
              </thead>
              <tbody>
                {topUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div id='errorTopUsers'></div>

    </div>
  )
}

export default TopUsers
