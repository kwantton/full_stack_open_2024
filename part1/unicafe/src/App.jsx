import { useState } from 'react'



const Statistics = (props) => {
  console.log("Greetings from Statistics!")
  if (props.all == 0) {
    return "No feedback given"
  }

  let sum = props.good - props.bad
  return (
    <table>
      <tbody>
      <StatisticLine statistic="good" value={props.good} />
      <StatisticLine statistic="neutral" value={props.neutral} />
      <StatisticLine statistic="bad" value={props.bad} />
      <StatisticLine statistic="all" value={props.all} />
      <StatisticLine statistic="average" value={(sum/props.all).toFixed(2)}/>
      <StatisticLine statistic="positive" value={(100*props.good/props.all).toFixed(1)} appendix=" %"/>
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  console.log("Greetings from StatisticLine!")
  return <tr>
    <td>
    {props.statistic}</td><td>{props.value}{props.appendix}</td></tr>
}

const Button = (props) => {
  console.log("Greetings from Button!")
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

function App() {
  // save clicks of each button to its own state
  console.log("------FRESH!------")
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const [allFeedback, setAllFeedback] = useState([])
  return (

  <div>
    <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text = "good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text = "neutral" />
      <Button onClick={() => setBad(bad + 1)} text = "bad"/>

    <h1>statistics</h1>
      <Statistics all = {all} good = {good} bad = {bad} neutral = {neutral}/>

  </div>

  )
}

export default App
