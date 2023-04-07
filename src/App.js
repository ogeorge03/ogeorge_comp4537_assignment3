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

  // geting pokemon data from API
  useEffect(() => {
    const result = async () => {
      const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
      setPokemon(response.data)
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
    console.log("TYpes: ", types)
  }, [])



  return (
    <>
      <Type />
      <h1>Page number {currentPage}</h1>
      <Page pokemons={pokemon} currentPage={currentPage} types={[]} />
      <Pagination pokemons={pokemon} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
