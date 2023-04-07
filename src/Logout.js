import React from 'react'

function Logout() {

  const handleLogout = () => {
    localStorage.removeItem("auth-token-access")
    localStorage.removeItem("auth-token-refresh")
    window.location.reload()
  }

  return (
    <div id="logout">
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
