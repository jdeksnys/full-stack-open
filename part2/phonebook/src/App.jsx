import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 123 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilter = (e) => {
    setFilterName(e.target.value)
  }

  const handlePersons = (e) => {
    e.preventDefault();
    if(persons.map(rec => rec.name).includes(newName)){
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({name: newName, number: parseInt(newNumber)}))
      setNewName('')
      setNewNumber('')
    }
  }

  function returnFilteredItem (person) {
    return <li key={person.name}>{person.name} {person.number}</li>
  }

  function filterNames (person) {
    return person.name.toLowerCase().includes(filterName.toLocaleLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:
        <input onChange={handleFilter}/>
      </div>
      <div>
        <h3>add a new</h3>
        <form>
          <div>
            name:
            <input value={newName} onChange={handleNewName} type='text'/>
          </div>
          <div>
            number (Int):
            <input type='text' value={newNumber} onChange={handleNewNumber} />
          </div>
          <div>
            <button type="submit" onClick={handlePersons}>add</button>
          </div>
        </form>
      </div>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(filterNames).map(returnFilteredItem)}
      </ul>
    </div>
  )
}

export default App