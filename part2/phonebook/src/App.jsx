import { useEffect, useState } from 'react'
import personService from './services/personService.js';
import '../index.css'


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
            number:
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
        {props.persons.filter(filterNames).map(rec => <RenderSingle key={rec.id} person={rec} deleteHook={props.deleteHook}/>)}
      </ul>
    </div>
  );
}


const RenderSingle = (props) => {
  return (
    <li>
      {props.person.name} {props.person.number}
      <button onClick={() => props.deleteHook(props.person)}>delete</button>
    </li>
  )
}

const Notification = (props) => {
  if (props.message === null) {
    return null
  }
  console.log(props)
  return (
    <div className={props.type == 'ok'
      ? 'ok notification'
      : props.type == 'error'
        ? 'error notification'
        : null}>
      {props.message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifType, setNotifType] = useState(null)

  const handleFilter = (e) => setFilterName(e.target.value);
  const handleNewName = (e) => setNewName(e.target.value);
  const handleNewNumber = (e) => setNewNumber(e.target.value);
  const handlePersons = (e) => {
    e.preventDefault();
    if(persons.map(rec => rec.name).includes(newName)){
      if(window.confirm(`${newName} is already added to phonebook. Update phone number with new one?`)){
        const oldPerson = persons.find(rec => rec.name == newName)
        const updatedPerson = {...oldPerson, number: newNumber}
        personService.update(updatedPerson.id, updatedPerson).then(response => {
          console.log("response", response)
          getAllHook()
          updateNotification(`update phone no. for ${updatedPerson.name}`, 'ok')
        }).catch(err => {
          updateNotification(`Information of ${updatedPerson.name} has already been removed from server`, 'error', 5000)
        })
      }
    } else {
      personService.create({name: newName, number: newNumber}).then(response => {
        console.log("response", response)
        getAllHook()
        setNewName('')
        setNewNumber('')
        updateNotification(`${newName} added`, 'ok')
      })
    }
  }

  function updateNotification(message, type, timeout=2000){
    setNotifMessage(message)
    setNotifType(type)
    setTimeout(() => {setNotifMessage(null)}, timeout)
  }

  const getAllHook = () => {
    personService.getAll()
      .then(response => {
        setPersons(response)
      })
  }
  useEffect(getAllHook, [])

  const deleteHook = (pers) => {
    if (window.confirm(`Delete ${pers.name}?`)) {
      personService.deleteById(pers.id).then(response => {
        getAllHook()
      })
    }
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} type={notifType}/>
      <Filter filterName={filterName} handler={handleFilter}/>
      <AddNewPersonForm
        newName={newName}
        newNumber={newNumber}
        nameHandler={handleNewName}
        numberHandler={handleNewNumber}
        personHandler={handlePersons}
      />
      <RenderAll persons={persons} filterName={filterName} deleteHook={deleteHook}/>
    </div>
  )
}

export default App