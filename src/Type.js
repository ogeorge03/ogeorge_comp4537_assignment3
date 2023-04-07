import axios from 'axios'
import { useEffect, useState } from 'react'

// Get types of pokemons from API
// link: https://github.com/fanzeyi/pokemon.json/blob/master/types.json


// Creates checkboxes for each type
function Type() {
  const [types, setTypes] = useState([])

  useEffect(() => {
    const result = async () => {
      const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json')
      setTypes(response.data)
    }
    result()
  }, [])

  return (
    <>
      {types.map((type) => (
        <div key={type.id}>
          <input type="checkbox" id={type.english} name={type.english} value={type.english} />
          <label htmlFor={type.english}>{type.english}</label>
        </div>
      ))}
    </>
  )
}



export default Type
