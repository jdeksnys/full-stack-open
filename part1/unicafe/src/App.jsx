import { useState } from 'react'



const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  );
}

const GetStats = (props) => {
  const getAvg = () => (props.good * 1 + props.bad * (-1)) / (props.good + props.bad + props.neutral)
  const getPositive = () => props.good / (props.good + props.bad + props.neutral)

  return (
    <div>
      <p>Average {() => getAvg()}</p>
      <p>Positive {() => getPositive()}</p>
    </div>
  );
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const updateGood = () => {
    const newGood = good + 1
    const newAll = (newGood + neutral + bad)
    const newAvg = (newGood - bad) / newAll
    const newPositive = newGood / newAll * 100
    setAll(newAll)
    setGood(newGood)
    setAvg(newAvg)
    setPositive(newPositive)
  }

  const updateBad = () => {
    const newBad = bad + 1
    const newAll = (good + neutral + newBad)
    const newAvg = (good - newBad) / newAll
    const newPositive = good / newAll * 100
    setAll(newAll)
    setBad(newBad)
    setAvg(newAvg)
    setPositive(newPositive)
  }

  const updateNeutral = () => {
    const newNeutral = neutral + 1
    const newAll = (good + newNeutral + bad)
    const newAvg = (good - bad) / newAll
    const newPositive = good / newAll * 100
    setNeutral(newNeutral)
    setAll(newAll)
    setAvg(newAvg)
    setPositive(newPositive)
  }

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <Button onClick={updateGood} text='good' />
        <Button onClick={updateNeutral} text='netral' />
        <Button onClick={updateBad} text='bad' />
      </div>
      
      <div>
        <h1>Statistics</h1>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>All {all}</p>
        <p>Average {avg}</p>
        <p>Positive {positive}%</p>
      </div>
      
    </div>
  )
}

export default App