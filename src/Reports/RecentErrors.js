import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function RecentErrors({accessToken, refreshToken}) {

  const [recentErrors, setRecentErrors] = React.useState([])

  useEffect(() => {
    try {
      document.getElementById('errorRecentErrors').innerHTML = ''
      const result = async () => {
        const res = await axios.get('http://localhost:6001/api/v1/recentErrors',{
          headers: {
            'auth-token-access': accessToken,
            'auth-token-refresh': refreshToken
        }})
        setRecentErrors(res.data)
      }
      result()
    } catch (err) {
      document.getElementById('errorRecentErrors').innerHTML = err.response.data
    }
  }, [accessToken, refreshToken])

  return (
    <div className="table">
      <h1>Recent 4xx & 5xx Errors</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recentErrors.map((error, index) => (
            <tr key={index}>
              <td>{error.date}</td>
              <td>{error.method}</td>
              <td>{error.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="errorRecentErrors"></div>
    </div>
  )
}

export default RecentErrors
