import { useState } from 'react'



const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  );
}

const Statistics = (props) => {
  function updateGood() {
    const newGood = props.good + 1
    const newAll = (newGood + props.neutral + props.bad)
    const newAvg = (newGood - props.bad) / newAll
    const newPositive = newGood / newAll * 100
    props.setGood(newGood)
    props.setAll(newAll)
    props.setAvg(newAvg)
    props.setPositive(newPositive)
  }

  function updateBad() {
    const newBad = props.bad + 1
    const newAll = (props.good + props.neutral + newBad)
    const newAvg = (props.good - newBad) / newAll
    const newPositive = props.good / newAll * 100
    props.setBad(newBad)
    props.setAll(newAll)
    props.setAvg(newAvg)
    props.setPositive(newPositive)
  }

  function updateNeutral() {
    const newNeutral = props.neutral + 1
    const newAll = (props.good + newNeutral + props.bad)
    const newAvg = (props.good - props.bad) / newAll
    const newPositive = props.good / newAll * 100
    props.setNeutral(newNeutral)
    props.setAll(newAll)
    props.setAvg(newAvg)
    props.setPositive(newPositive)
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
        <p>Good {props.good}</p>
        <p>Neutral {props.neutral}</p>
        <p>Bad {props.bad}</p>
        <p>All {props.all}</p>
        <p>Average {props.avg}</p>
        <p>Positive {props.positive}%</p>
      </div>
      
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)


  return (
    <Statistics
      good={good}
      bad={bad}
      neutral={neutral}
      all={all}
      avg={avg}
      positive={positive}
      setGood={setGood}
      setBad={setBad}
      setNeutral={setNeutral}
      setAll={setAll}
      setAvg={setAvg}
      setPositive={setPositive}
    />
  )
}

export default App