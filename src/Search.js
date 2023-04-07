import React from 'react'


// Search bar that updates the searchQuery state when the user types in the search bar
function Search({setSearchQuery, setCurrentPage}) {
  return (
    <>
      <input type="text" placeholder="Search" onChange={(e) => {
        setSearchQuery(e.target.value)
        setCurrentPage(1)
        }} />
    </>
  )
}

export default Search
