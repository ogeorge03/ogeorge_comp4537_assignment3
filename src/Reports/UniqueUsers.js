import React, { useEffect } from 'react'
import axios from 'axios'


function formatHour(hour) {
  if (hour < 10) {
    return `0${hour}`
  }
  return hour
}

function UniqueUsers({accessToken, refreshToken}) {

  const [uniqueUsers, setUniqueUsers] = React.useState([])

  useEffect(() => {
    try {
      document.getElementById('errorUniqueUsers').innerHTML = ''
      const result = async () => {
        const response = await axios.get('http://localhost:6001/api/v1/uniqueUsers', {
          headers: {
            'auth-token-access': accessToken,
            'auth-token-refresh': refreshToken
          }
        })
        setUniqueUsers(response.data)
      }
      result()
    } catch (err) {
      document.getElementById('errorUniqueUsers').innerHTML = err.response.data
    }

  }, [accessToken, refreshToken])

  const hours = [...Array(24).keys()]

  // Create table in format of:
  // Hour | Count
  // 00 | 10
  // 01 | 20

  const date = new Date()

  return (
    <div>
      <h2>Unique Users for {date.toLocaleDateString()}</h2>
      <table>
        <thead>
          <tr>
            <th>Hour</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {hours.map(hour => {
            return (
              <tr key={hour}>
                <td>{formatHour(hour)}</td>
                <td>{uniqueUsers[hour] ? uniqueUsers[hour] : 0}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div id="errorUniqueUsers"></div>
    </div>
  )
}

export default UniqueUsers
