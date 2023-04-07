import React from 'react'

function formatId(id) {
  if (id < 10) {
    return "00" + id
  } else if (id < 100) {
    return "0" + id
  } else {
    return id
  }
}

function Page({pokemons, currentPage, types}) {

  // filter pokemons based on selected types (the pokemon must have all the selected types)
  // if none of the types are selected, return all pokemons
  if (types.some((type) => type.selected)) {
    pokemons = pokemons.filter((pokemon) => {
      return types.every((type) => {
        if (type.selected) {
          return pokemon.type.includes(type.english)
        }
        return true
      })
    })
  }

 // Display max 10 pokemons per page
  const pageSize = 10
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPokemons = pokemons.slice(startIndex, endIndex)



  // <img src = {"https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/" + pokemon.id + ".png"} alt = {pokemon.name.english} />


  return (
    <div className='pokemons'>
      {
        currentPokemons.map((pokemon) => {
          return (
            <div key={pokemon.id} className="pokemon">
              <h4>{pokemon.name.english}</h4>
              <img src = {"https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/" + formatId(pokemon.id) + ".png"} alt ="NO CRABOMINABLE"
              width = "100" height = "100" />
            </div>
          )
        }
        )
      }
    </div>
  )
}

export default Page
