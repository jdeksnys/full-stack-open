import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 123 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <ul>
        {persons.map(note => <li key={note.name}>{note.name} {note.number}</li>)}
      </ul>
    </div>
  )
}

export default App