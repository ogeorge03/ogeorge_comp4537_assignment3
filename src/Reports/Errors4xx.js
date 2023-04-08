import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function Errors4xx({accessToken, refreshToken}) {

  const [errors4xx, setErrors4xx] = React.useState([])

  useEffect(() => {
    try {
      document.getElementById('errorErrors4xx').innerHTML = ''
      const result = async () => {
        const res = await axios.get('http://localhost:6001/api/v1/recentErrors',{
          headers: {
            'auth-token-access': accessToken,
            'auth-token-refresh': refreshToken
        }})
        // Only keep 400 type errors
        setErrors4xx(res.data.filter(error => error.status >= 400 && error.status < 500))
      }
      result()
      } catch (err) {
        document.getElementById('errorErrors4xx').innerHTML = err.response.data
      }
  }, [accessToken, refreshToken])


  return (
    <div>
      <h1>4xx Errors by Endpoint</h1>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Status</th>
            <th>Endpoint</th>
          </tr>
        </thead>
        <tbody>
          {errors4xx.map((error, index) => (
            <tr key={index}>
              <td>{error.method}</td>
              <td>{error.status}</td>
              <td>{error.endpoint}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="errorErrors4xx"></div>
    </div>
  )
}

export default Errors4xx
