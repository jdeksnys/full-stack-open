import { useState } from 'react'



const Filter = (props) => {
  return (
    <div>
      filter shown with:
      <input onChange={props.handler}/>
    </div>
  );
}


const AddNewPersonForm = (props) => {
  return (
    <div>
        <h3>add a new</h3>
        <form>
          <div>
            name:
            <input value={props.newName} onChange={props.nameHandler} type='text'/>
          </div>
          <div>
            number (Int):
            <input type='text' value={props.newNumber} onChange={props.numberHandler} />
          </div>
          <div>
            <button type="submit" onClick={props.personHandler}>add</button>
          </div>
        </form>
      </div>
  );
}

const RenderAll = (props) => {
  const filterNames = (person) => person.name.toLowerCase().includes(props.filterName.toLocaleLowerCase())
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {props.persons.filter(filterNames).map(rec => <RenderSingle key={rec.name} person={rec}/>)}
      </ul>
    </div>
  );
}


const RenderSingle = (props) => <li>{props.person.name} {props.person.number}</li>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 123 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleFilter = (e) => setFilterName(e.target.value);
  const handleNewName = (e) => setNewName(e.target.value);
  const handleNewNumber = (e) => setNewNumber(e.target.value);
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
      <Filter filterName={filterName} handler={handleFilter}/>
      <AddNewPersonForm
        newName={newName}
        newNumber={newNumber}
        nameHandler={handleNewName}
        numberHandler={handleNewNumber}
        personHandler={handlePersons}
      />
      <RenderAll persons={persons} filterName={filterName}/>
    </div>
  )
}

export default App