import React from 'react'
import axios from 'axios'


function Login({setAccessToken, setRefreshToken}) {

  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username: username,
        password: password
      })
      setAccessToken(res.headers["auth-token-access"])
      setRefreshToken(res.headers["auth-token-refresh"])
    } catch (err) {
      document.getElementById("error").innerHTML = err.response.data
    }


  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <div id="error"></div>
    </div>
  )
}

export default Login
