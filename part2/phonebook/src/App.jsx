import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handlePersons = (e) => {
    e.preventDefault();
    setPersons(persons.concat({name: newName}))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit" onClick={handlePersons}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(note => <li key={note.name}>{note.name}</li>)}
      </ul>
    </div>
  )
}

export default App