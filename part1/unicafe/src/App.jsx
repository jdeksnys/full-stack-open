import { useState } from 'react'



const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  );
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
        <Button onClick={() => setNeutral(neutral + 1)} text='netral' />
        <Button onClick={() => setBad(bad + 1)} text='bad' />
      </div>
      
      <div>
        <h1>Statistics</h1>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
      </div>
    </div>
  )
}

export default App