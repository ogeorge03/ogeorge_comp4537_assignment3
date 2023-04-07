// Creates checkboxes for each type
function Type({ currentTypes, setCurrentTypes, setCurrentPage }) {

  return (
    <>
      {currentTypes.map((type) => (
        <div key={type.id}>
          <input type="checkbox" id={type.english} name={type.english} value={type.english} key={type.id}
          onChange={(e) => {
            setCurrentTypes(currentTypes.map((type) => {
              if (type.english === e.target.value) {
                setCurrentPage(1)
                return { ...type, selected: !type.selected }
              } else {
                return type
              }
            }))
          }} />
          <label htmlFor={type.english}>{type.english}</label>
        </div>
      ))}
    </>
  )
}



export default Type
