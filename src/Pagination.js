import React from 'react'

function Pagination({pokemons, currentPage, setCurrentPage}) {

  // Pagination shows 10 pages at a time and the current page has the class "active"
  // Pages at the bottom are in groups
  // ex: 1-10, 11-20, 21-30, etc
  // Each page contains 10 pokemon max
  // so if there are 100 pokemon, there will be 10 pages
  // if there are 101 pokemon, there will be 11 pages
  // if there are less than 91 pokemon, there 9 pages


  if (pokemons.length === 0) {
    return null
  }

  var pageSize;
  if (pokemons.length >= 91){
    pageSize = 10;
  } else {
    pageSize = pokemons.length / 10;
  }

  const totalPages = Math.ceil(pokemons.length / pageSize)

  return (
    <>
    {
      currentPage !== 1 &&
      <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
    }
    <div>
      {
        Array.from({
          length: Math.ceil(pokemons.length / pageSize)
        }).map((_, index) => {
          const startIndex = currentPage % 10 === 0 ? currentPage - 9 : currentPage - (currentPage % 10) + 1
          const endIndex = startIndex + 9
          if (index + 1 >= startIndex && index + 1 <= endIndex) {
            return (
              <button key={index} onClick={() => setCurrentPage(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
                {index + 1}
              </button>
            )
          }
        })
      }
    </div>
    {
      currentPage !== totalPages &&
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
    }
    </>
  )
}

export default Pagination
