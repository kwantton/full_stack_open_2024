import { useEffect, useState } from 'react'
import countryServices from './services/countryServices'

const Message = ({message}) => {
  return (
    <p>{message}</p>)
}

/*useEffect (() => {

}) */
const Country = ({country, shownCountry}) => {

  if (country === null) {return ""}
  if (shownCountry === null) {return ""}

  let languages = country.languages
  languages = Object.values(languages)

  const tableStyle = {    
    color: 'grey',    
    fontSize: 16,
    width: 250 } // thanks to this, less congested columns c: https://reactnative.dev/docs/height-and-width
    //display:'inline-block'  }    // doesn't work

    const divStyle = {    
      background:"rgb(223,245,230)"} // thanks to this, less congested columns c: https://reactnative.dev/docs/height-and-width
      //display:'inline-block'  }    // doesn't work

  return (
    <div style={divStyle}>
      <h1>{country.name.common}</h1>
      <table style={tableStyle}>
        <tr><td>capital</td>    <td>{country.capital}</td></tr>
        <tr><td>area</td>       <td>{country.area} km^2 </td></tr>
        <tr><td>population</td> <td>{country.population}</td></tr>
      </table>

      <h3>languages:</h3>
      <ul>
        {languages.map(language => 
        <li>{language}</li>)}
      </ul>
      <p></p> {/** some space c: */}
      <img src={`${country.flags.svg}`} width={200} height={"auto"}/>
    </div>
  ) // testi
}

const Countries = ({hae, setHae, selectedCountry, allCountries, setAllCountries, setMessage, filteredNames, setFilteredNames, filteredCountries, setFilteredCountries, shownCountry, setShownCountry}) => {
  
  const handleShowButtonClick = (officialName) => {
    console.log("show-button clicked! Name of the Country:", officialName)
    console.log("filtered countries:", filteredCountries)
    const matchingCountry = filteredCountries.find(country => country.name.official === officialName)
    console.log("matching country:", matchingCountry) // this is the country we wanna show c:
    //const countryToShow = <Country country={matchingCountry}/> // tehääs tästä state, joka näytetään
    setShownCountry(matchingCountry)
    
  }
  
  if (hae) { // all of this is ONLY executed if(hae), which is truthy only if input field value has just changed.
  countryServices.getAll()
  .then(data => {
    console.log("countryServices.getAll().then(data => data[0]):", data[0])
    
    const filteredCountries = data.filter(item => {
      console.log("hello from filter!")
      let nimikandidaatit = [item.name.common.toLowerCase(), item.name.official.toLowerCase()]
      console.log("filter [item.name.common.toLowerCase(), item.name.official.toLowerCase()]:", 
      nimikandidaatit)
      let löytykö = false
      nimikandidaatit.forEach(kandi => {
        console.log("hello from nimikandidaatit.forEach!")
        if(kandi.includes(selectedCountry.toLowerCase())) {
          löytykö = true
          console.log(`nimikandi "${kandi}" matchasi haettavaan joka on "${selectedCountry}"`)
        }
      })
      if (löytykö) {return true} // filtteröitävä item = true -> filtteröinti lisää listaan kyseisen kohteen, koska nimi matchas
    }) // fltteri päättyi tähän!

    console.log("countryList ELIKKÄ HAUSSA LÖYTYNEET:", filteredCountries)
    if (filteredCountries.length > 10) {
      setMessage("Too many matches, specify another filter")
    } else if (filteredCountries.length == 1) {
      setMessage("")
      let nimi = filteredCountries[0].name.official
      setFilteredNames([nimi])
      setFilteredCountries([filteredCountries[0]])
    } else { // jos nimiä on 2-10:
      setMessage("")
      
      let nimet = filteredCountries.map(country => {
        return country.name.official
      })
      console.log("suodatettujen tulosten (alle 10!) nimet:", nimet)
      setFilteredNames(nimet)
      setFilteredCountries(filteredCountries)
    }
    setHae(false)  // haettu; älä enää hae
  }
  )
  
}
console.log("filteredNames:", filteredNames)
if (filteredNames.length > 1) {
  const countriesTableStyle={
    width:250
  }
return (
  <table style={countriesTableStyle}>
    {filteredNames.map(name => {
      return (
      <tr>
        <td>{name}</td> <td><button onClick={() => handleShowButtonClick(name)}>show</button></td>
      </tr> 
    )
      })}   
  </table>
)} else {
  //return "yks vaan..."
  if (filteredCountries.length>0) {
  console.log("löyty yks vaan:", filteredCountries[0])
    setShownCountry(filteredCountries[0])
    return ""
  } else {
    setShownCountry(null)
    return ""
  }
  }
}

function App() {
  const[selectedCountry, setSelectedCountry] = useState('')
  const[allCountries, setAllCountries] = useState([])
  const[hae, setHae] = useState(true)
  const[message, setMessage] = useState("")
  const[filteredNames, setFilteredNames] = useState([])
  const[filteredCountries, setFilteredCountries] = useState([])
  const[shownCountry, setShownCountry] = useState(null)

  const handleCountryChange = event => {
    console.log("value:",event.currentTarget.value)
    setSelectedCountry(event.currentTarget.value)
    setShownCountry(null) // ettei näytetä ikusesti
    setHae(true) // lähdetään hakemaan sisältöä Countries-osastolla
  }

  return (
    <>
      <div>
        find countries <input value={selectedCountry} onChange={handleCountryChange}></input>
      </div>

      <div>
        <Message message={message}/>
      </div>

      <div>
        <Countries selectedCountry={selectedCountry} allCountries={allCountries} setAllCountries={setAllCountries} message={message} setMessage={setMessage} filteredNames={filteredNames} setFilteredNames={setFilteredNames} hae={hae} setHae={setHae} filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} shownCountry={shownCountry} setShownCountry={setShownCountry}/>
        <Country shownCountry={shownCountry} country={shownCountry}/>
      </div>
    </>
  )
}

export default App
