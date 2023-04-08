import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function TopEndpoint({accessToken, refreshToken}) {

  const [topEndpoint, setTopEndpoint] = React.useState([])

  useEffect(() => {
    try {
      document.getElementById('errorTopEndpoint').innerHTML = ''
      const result = async () => {
        const res = await axios.get('http://localhost:6001/api/v1/recentErrors',{
          headers: {
            'auth-token-access': accessToken,
            'auth-token-refresh': refreshToken
        }})
        // Find the top user for each endpoint
        // so count endpoints that have the same username
        // and endpoint and then sort by count
        const topEndpoint = res.data.reduce((acc, error) => {
          const key = `${error.endpoint} ${error.username}`
          if (acc[key]) {
            acc[key]++
          } else {
            acc[key] = 1
          }
          return acc
        }, {})
        const topEndpointArray = Object.keys(topEndpoint).map(key => {
          const [endpoint, username] = key.split(' ')
          return {endpoint, username, count: topEndpoint[key]}
        }
        )
        topEndpointArray.sort((a, b) => b.count - a.count)
        setTopEndpoint(topEndpointArray)
      }
      result()
    } catch (err) {
      document.getElementById('errorTopEndpoint').innerHTML = err.response.data
    }
  }, [accessToken, refreshToken])



  return (
    <div>
      <h1>Top Endpoint by User</h1>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Count</th>
              <th>Endpoint</th>
              </tr>
              </thead>
              <tbody>
                {topEndpoint.map((endpoint, index) => (
                  <tr key={index}>
                    <td>{endpoint.username}</td>
                    <td>{endpoint.count}</td>
                    <td>{endpoint.endpoint}</td>
                  </tr>
                ))}
                </tbody>
                </table>
                <div id="errorTopEndpoint"></div>
    </div>
  )
}

export default TopEndpoint
