import React from 'react'

function Pagination({pokemons, currentPage, setCurrentPage}) {
  const pageSize = 10;
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
      currentPage !== 81 &&
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
    }
    </>
  )
}

export default Pagination
