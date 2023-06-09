import axios from 'axios'
import { useEffect, useState } from 'react'
import Type from "./Type";
import Page from "./Page";
import Pagination from "./Pagination";
import Search from "./Search";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Dashboard from "./Dashboard";

function App() {

  const [pokemon, setPokemon] = useState([])
  // types stores types and a boolean value to check if the type is selected
  const [types, setTypes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [numPokemons, setNumPokemons] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  const [accessToken, setAccessToken] = useState("")
  const [refreshToken, setRefreshToken] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

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
      {accessToken === "" ?
      <><Login setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} setIsAdmin={setIsAdmin} />
      <Register setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} /></>
       :
        <>
          {accessToken !== "" && isAdmin ? <Dashboard accessToken={accessToken} refreshToken={refreshToken} /> :
          <><Logout /><Search setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} /><Type currentTypes={types} setCurrentTypes={setTypes} setCurrentPage={setCurrentPage} />
          {numPokemons === 0 ? <h1>No Pokemon Found</h1>: <h1>Page Number {currentPage}</h1>}
          <Page pokemons={pokemon} currentPage={currentPage} types={types} setNumPokemons={setNumPokemons} searchQuery={searchQuery} />
          <Pagination pokemons={pokemon} currentPage={currentPage} setCurrentPage={setCurrentPage} numPokemons={numPokemons} /></>}
        </>
  }
  </>
  );
}
export default App;
