import { useState } from 'react'

const Button = (props) => {
  console.log("Greetings from Button!")
  return (
    //this onClick should setAnecdoteNumber as 0...7 (GetRandomInt0to7) whenever the button is clicked
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const VoteButton = (props) => {
  console.log("Greetings from VoteButton!");
  console.log("Vote counts: ",  props.votes);
  return (
    //this onClick should setSelected as 0...7 (GetRandomInt0to7) whenever the button is clicked
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const ShowBestAnecdote = (props) => { 
  let max_votes = 0
  let best_anecdote = props.anecdotes[0]
  for (const i in props.votes) {
    if (props.votes[i] >= max_votes) { // "for i in array" means that i = key!!
      max_votes = props.votes[i]
      best_anecdote = props.anecdotes[i]
    }
  }
  return (
  <div>
    <p> {best_anecdote} </p>
    <p> has {max_votes} votes </p>
    </div>
  )
}

const GetRandomInt0to7 = (anecdote_number) => {
  console.log("Button -> Greetings from GetRandomInt0to7!")
  const oldnumber = anecdote_number
  let newnumber = anecdote_number.valueOf()
  while (newnumber == oldnumber) {
    newnumber = Math.floor(Math.random() * 8);}
  console.log("New number is",newnumber)
  //setSelected(newnumber)
  return newnumber
}

function App() {
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
  console.log("--------------REFRESH--------------")
  console.log("start of App")

  const [anecdote_number, setAnecdoteNumber] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(8)) /*[0,0,0,0,0,0,0,0] */

  let random_number_0_to_7 = anecdote_number;
  let copy_random_number_0_to_7 = random_number_0_to_7.valueOf(); /*trying to copy only the VALUE, not the reference */
  
  const copy_of_votes = [...votes] /* this new copy can be setVotes:ed! */
  copy_of_votes[copy_random_number_0_to_7]+=1 /* this to be set as setVotes onClick of VoteButton! */

  console.log("copy of votes:", copy_of_votes);
  console.log("votes:", votes);

  const VoteButtonFunction = () => {
    console.log("VoteButton PRESSED!")
    setVotes(copy_of_votes);
    console.log("VoteButton press finished!!")
    console.log("STARTING ButtonFunction as VoteButton has finished")
    ButtonFunction()
  }

  const ButtonFunction = () => {
    console.log("Button PRESSED!")
    setAnecdoteNumber(GetRandomInt0to7(anecdote_number));
    console.log("Button press finished!")
    
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[anecdote_number]}
      <p>has {votes[anecdote_number]} votes</p>
      {console.log("-----------Starting Button:---------------")}
      <Button onClick={ButtonFunction} text = "next anecdote"/>
      <VoteButton onClick={VoteButtonFunction} text = "vote" number_0_to_7 = {copy_random_number_0_to_7} votes = {votes}/>
      
      <h1>Anecdote with most votes</h1>
      <ShowBestAnecdote anecdotes = {anecdotes} votes = {votes} />
      {console.log("-----------END of return section---------------")}
    </div>
  )
  
}

export default App
