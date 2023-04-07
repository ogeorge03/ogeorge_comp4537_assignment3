import React from 'react'

function Pagination({pokemons, currentPage, setCurrentPage, numPokemons}) {


  if (numPokemons === 0) {
    return null
  }

  var pageSize;
  if (numPokemons >= 91) {
    pageSize = 10
  } else {
    pageSize = Math.ceil(numPokemons / 10)
  }

  const numPages = Math.ceil(numPokemons / 10)

  // Pagination shows 10 pages at a time and the current page has the class "active"
  // Pages at the bottom are in groups
  // ex: 1-10, 11-20, 21-30, etc
  // Each page contains 10 pokemon max
  // so if there are 100 pokemon, there will be 10 pages
  // if there are 101 pokemon, there will be 11 pages
  // if there are less than 91 pokemon, there 9 pages
  // only show page numbers for pages with pokemon
  // ex: if there are 17 pokemon, there will be 2 pages
  // 10 on the first page and 7 on the second page
  return (
    <>
    {
      currentPage !== 1 && <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
    }
    <div>
      {
        // show only 10 page numbers at a time
        // if on page 2 show 1-10
        // if on page 3 show 1-10
        // if on page 76 show 71-80
        // etc
        Array.from({
          length: Math.ceil(pokemons.length / pageSize)
        }).map((_, index) => {
          const startIndex = currentPage % 10 === 0 ? currentPage - 9 : currentPage - (currentPage % 10) + 1
          const endIndex = startIndex + 9
          if (index + 1 >= startIndex && index + 1 <= endIndex && index + 1 <= numPages) {
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
      currentPage !== numPages && <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
    }
    </>
  )

}

export default Pagination
