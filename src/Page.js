import React from 'react'
import {useState} from 'react'
import PokemonDetails from './PokemonDetails'

function formatId(id) {
  if (id < 10) {
    return "00" + id
  } else if (id < 100) {
    return "0" + id
  } else {
    return id
  }
}

function Page({pokemons, currentPage, types, setNumPokemons, searchQuery}) {

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

  if (searchQuery !== "") {
      // set the query to lowercase
      // use regex to match the query
      // for example "Pika" will be  /\w*p\w*i\w*k\w*a\w\w*/i
      // which will match "Pikachu", "Pikapi", "Pikapika", "Pikapikachu", etc.
      const query = searchQuery.toLowerCase().split("").join("\\w*") + "\\w*"
      const regex = new RegExp(query, "i")
      pokemons = pokemons.filter((pokemon) => {
        return regex.test(pokemon.name.english)
      })
  }


  setNumPokemons(pokemons.length)

 // Display max 10 pokemons per page
  const pageSize = 10
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPokemons = pokemons.slice(startIndex, endIndex)
  // const [showDetails, setShowDetails] = useState(false)

  // showDetails is a map [pokemonId -> boolean]
  // if showDetails[pokemonId] is true, show the details of the pokemon
  // if showDetails[pokemonId] is false, hide the details of the pokemon
  const [showDetails, setShowDetails] = useState({})




  // <img src = {"https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/" + pokemon.id + ".png"} alt = {pokemon.name.english} />


  return (
    <div className='pokemons'>
      {
        currentPokemons.map((pokemon) => {
          const imageUrl = "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/" + formatId(pokemon.id) + ".png"
          return (
            <div key={pokemon.id} className="pokemon">
              <h4>{pokemon.name.english}</h4>
              <img src = {imageUrl} alt ={pokemon.name.english}
              width = "100" height = "100" onClick={() => setShowDetails((prev) => ({...prev, [pokemon.id]: !prev[pokemon.id]}))} />
              {
                showDetails[pokemon.id] && <PokemonDetails pokemon={pokemon} imageUrl={imageUrl} setShowDetails={setShowDetails} />
              }
            </div>
          )
        }
        )
      }
    </div>
  )
}

export default Page
