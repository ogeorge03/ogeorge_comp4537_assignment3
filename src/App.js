import axios from 'axios'
import { useEffect, useState } from 'react'
import Type from "./Type";
import Page from "./Page";
import Pagination from "./Pagination";

function App() {

  const [pokemon, setPokemon] = useState([])
  // types stores types and a boolean value to check if the type is selected
  const [types, setTypes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [numPokemons, setNumPokemons] = useState(0)

  // geting pokemon data from API
  useEffect(() => {
    const result = async () => {
      const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
      setPokemon(response.data)
      setNumPokemons(response.data.length)
    }
    result()
  }, [])

  // get types from API and default value of selected is false
  useEffect(() => {
    const result = async () => {
      const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json')
      setTypes(response.data.map((type) => ({ ...type, selected: false })))
    }
    result()
  }, [])


  return (
    <>
      <Type currentTypes={types} setCurrentTypes={setTypes} setCurrentPage={setCurrentPage}/>
      <h1>Page number {currentPage}</h1>
      <Page pokemons={pokemon} currentPage={currentPage} types={types} setNumPokemons={setNumPokemons} />
      <Pagination pokemons={pokemon} currentPage={currentPage} setCurrentPage={setCurrentPage} numPokemons={numPokemons} />
    </>
  );
}

export default App;
