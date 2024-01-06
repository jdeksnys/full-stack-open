import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const PopularAnedote = (props) => {
  let max = Math.max(...Object.values(props.anecdotePts))
  let i = Object.values(props.anecdotePts).indexOf(max)
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[i]}</p>
      <p>Has {max} vote(s)</p>
    </div>
  )
}

const updateSelected = (anecdotes, setSelected) => () => {
  let random = Math.floor(Math.random() * anecdotes.length);
  setSelected(random)
}

const updatePts = (selected, anecdotePts, setAnecdotePts) => () => {
  const ptsCopy = {...anecdotePts}
  ptsCopy[selected] += 1
  setAnecdotePts(ptsCopy)
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  function createPtsObject() {
    let resultObject = {};
    for (let i = 0; i < anecdotes.length; i++) {
        resultObject[i] = 0;
    }
    return resultObject;
  }

  let ptsObject = createPtsObject()
  const [selected, setSelected] = useState(0)
  const [anecdotePts, setAnecodePts] = useState(ptsObject)

  return (
    <div>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        Has {anecdotePts[selected]} points
      </div>
      <Button onClick={updatePts(selected, anecdotePts, setAnecodePts)} text='vote'/>
      <Button onClick={updateSelected(anecdotes, setSelected)} text='next anecdote'/>
      <PopularAnedote anecdotes={anecdotes} anecdotePts={anecdotePts} />
    </div>
  )
}

export default App