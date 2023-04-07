import React from 'react'


// Search bar that updates the searchQuery state when the user types in the search bar
function Search({setSearchQuery}) {
  return (
    <>
      <input type="text" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} />
    </>
  )
}

export default Search
