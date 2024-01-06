import { useState } from 'react'



const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  );
}


const Statistics = (props) => {
  const calcAll = () => (props.good + props.neutral + props.bad)
  const calcAvg = () => (props.good - props.bad) / calcAll()
  const calcPositive = () => props.good / calcAll() * 100

  if(calcAll() === 0){
    return(
      <div>
        <h1>Statistics</h1>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>
          <h1>Statistics</h1>
          <p>Good {props.good}</p>
          <p>Neutral {props.neutral}</p>
          <p>Bad {props.bad}</p>
          <p>All {calcAll()}</p>
          <p>Average {calcAvg()}</p>
          <p>Positive {calcPositive()}%</p>
      </div>
    )
  }

}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <Button onClick={() => setGood(good + 1)} text='good' />
        <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button onClick={() => setBad(bad + 1)} text='bad' />
      </div>

      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        />
    </div>
  )
}

export default App