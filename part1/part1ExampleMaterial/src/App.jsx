 
/* THIS WHOLE THING (above) WAS HERE ORIGINALLY, not as a comment that is */

/* app.jsx defines a React component with the name App (below) */

/* The thing below was added instead, according to instructions */
import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
        </div>
      )
    }  return (    
    <div>
      button press history: {props.allClicks.join(' ')}
      </div>  )}
  
const Button = ({ handleClick, text }) => (
<button onClick={handleClick}>
  {text}
  </button>)

const App = () => {
  const [value, setValue] = useState(10)
  
  const setToValue = (newValue) => () => {
    console.log('value now', newValue)  // print the new value to console
    setValue(newValue)
  }
  
  return (
    <div>
      {value}

      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}
export default App