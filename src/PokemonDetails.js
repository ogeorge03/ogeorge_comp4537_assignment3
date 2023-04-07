import React from 'react'
import Modal from 'react-modal'
import { useState } from 'react'

// Show details of the specific pokemon
// ID, name, image, type(s), base stats
// in a modal

// Make modal a small window
Modal.setAppElement('#root')
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.5)'
Modal.defaultStyles.content.width = '400px'
Modal.defaultStyles.content.height = '500px'
Modal.defaultStyles.content.margin = 'auto'
Modal.defaultStyles.content.padding = '0'


function PokemonDetails({pokemon, imageUrl, setShowDetails}) {
  const [showModal, setShowModal] = useState(true)

    return (
      <>
        <Modal isOpen={showModal}>
            <div className="pokemon-details">
              <button id="modalClose" onClick={() => {
                setShowModal(false)
                setShowDetails((prev) => ({...prev, [pokemon.id]: false}))
                }}>X</button>
                <div className="pokemon-details-image">
                  <img src={imageUrl} alt={pokemon.name.english}  width = "100" height = "100" />
                </div>
                <div className="pokemon-details-info">
                  <h1>{pokemon.name.english}</h1>
                  <p>ID: {pokemon.id}</p>
                  {pokemon.type.length === 1 && <p>Type: {pokemon.type}</p>}
                  {pokemon.type.length > 1 && <p>Type(s): {pokemon.type.join(", ")}</p>}
                  <p>Base Stats:</p>
                  <p>HP: {pokemon.base.HP}</p>
                  <p>Attack: {pokemon.base.Attack}</p>
                  <p>Defense: {pokemon.base.Defense}</p>
                  <p>Sp. Attack: {pokemon.base["Sp. Attack"]}</p>
                  <p>Sp. Defense: {pokemon.base["Sp. Defense"]}</p>
                  <p>Speed: {pokemon.base.Speed}</p>
                </div>
            </div>
        </Modal>
      </>
    )

}

export default PokemonDetails
