import React from 'react'
import axios from 'axios'

function Register({setAccessToken, setRefreshToken}) {

  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [email, setEmail] = React.useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/register", {
        username: username,
        password: password,
        email: email
      })
      setAccessToken(res.headers["auth-token-access"])
      setRefreshToken(res.headers["auth-token-refresh"])
      document.getElementById("errorRegister").innerHTML = ""
    } catch (err) {
      document.getElementById("errorRegister").innerHTML = err.response.data
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      <div id="errorRegister"></div>
    </div>
  )
}

export default Register
