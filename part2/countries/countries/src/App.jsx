import { useEffect, useState } from 'react'
import countryServices from './services/countryServices.js'
import getWeather from './services/weatherServices'

const Message = ({message}) => {
  return (
    <p>{message}</p>)
}

/*useEffect (() => {

}) */
const Weather = ({shownCountry, shownWeather, setShownWeather}) => {
  if(shownCountry === null) {return ""}
  return ""
  console.log(`hello from Weather(${(shownCountry.name.common)})!`)
  const capital = shownCountry.capital
  const countryAbbreviationTwoLetters = shownCountry.tld[0].substring(1)
  getWeather(capital,countryAbbreviationTwoLetters)
  .then(data => {
    console.log("säädata:",data)
  })
}

const Candidates = ({candidateList, handleShowButtonClick}) => {
  console.log("hello from candidates! candidateList:", candidateList)
  
  const countriesTableStyle={
    width:250
  }
return (
  <ul>
    {candidateList.map(name => {
      return (
      <li>
         {name} <button onClick={() => handleShowButtonClick(name)}>show</button>
      </li> 
    )
      })}   
  </ul>
)
}

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
        <tbody>
          <tr><td>capital</td><td>{country.capital}</td></tr>
          <tr><td>area</td><td>{country.area} km^2 </td></tr>
          <tr><td>population</td><td>{country.population}</td></tr>
        </tbody>
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

function App() {
  const[selectedCountry, setSelectedCountry] = useState('')
  const[allCountries, setAllCountries] = useState([])
  const[hae, setHae] = useState(false) // jos tämän laittaa default true, hakee noin 1500 kertaa ennen kuin edes osaa päivittää itsensä falseksi... huokaus
  const[message, setMessage] = useState("")
  const[filteredNames, setFilteredNames] = useState([])
  const[filteredCountries, setFilteredCountries] = useState([])
  const[shownCountry, setShownCountry] = useState(null)
  const[shownWeather, setShownWeather] = useState(null)
  const[candidateList, setCandidateList] = useState([])

  const handleCountryChange = event => {
    console.log("value:",event.currentTarget.value)
    setSelectedCountry(event.currentTarget.value)
    setShownCountry(null) // ettei näytetä ikusesti
    setHae(true) // lähdetään hakemaan sisältöä Countries-osastolla
  }

  const handleShowButtonClick = (officialName) => {
    console.log("show-button clicked! Name of the Country:", officialName)
    console.log("filtered countries:", filteredCountries)
    const matchingCountry = filteredCountries.find(country => country.name.official === officialName)
    console.log("matching country:", matchingCountry) // this is the country we wanna show c:
    //const countryToShow = <Country country={matchingCountry}/> // tehääs tästä state, joka näytetään
    setShownCountry(matchingCountry) 
  }
  
  useEffect(() => { // ...}, [hae] // <- below: all of this is ONLY executed if hae changes. The "hae" is truthy only if input field value has just changed.
  countryServices.getAll()
  .then(data => {
    console.log("countryServices.getAll().then(data => data[0]):", data[0])
    
    const filteredMaat = data.filter(item => {
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

    console.log("countryList ELIKKÄ HAUSSA LÖYTYNEET:", filteredMaat)
    if (filteredMaat.length > 10) {

      setMessage("Too many matches, specify another filter")
      setShownCountry(null)
      setCandidateList([])
    } else if (filteredMaat.length === 1) {
      let nimi = filteredMaat[0].name.official
      
      setMessage("")
      setShownCountry(filteredMaat[0])
      setFilteredNames([nimi])
      setCandidateList([])
      setFilteredCountries([filteredMaat[0]])
    } else if (filteredMaat.length > 1) { // jos nimiä on 2-10:
      
      setMessage("")
      setShownCountry(null)
      let nimet = filteredMaat.map(country => {
        return country.name.official
      })
      setFilteredNames(nimet)
      setFilteredCountries(filteredMaat)
      setCandidateList([...nimet])
      
      
      console.log("suodatettujen tulosten (alle 10!) nimet:", nimet)
      console.log("candidateList päivitetään sisällöllä filteredNames, joka on", filteredNames)
    } else {
      setMessage("no matches, please try another input")
      setFilteredNames([])
      setFilteredCountries([])
      setShownCountry(null)
      setCandidateList([])
    }
  }) //.then loppuu näihin
  
  console.log("filteredNames:", filteredNames)
   if (filteredCountries.length === 1) {
    setCandidateList([]) // nollataan
    
      // "yksi vaan..."
    console.log("löyty yks vaan:", filteredCountries[0])
      setShownCountry(filteredCountries[0])
    } 
    setHae(false)  // tulee tehtyä tokankin kerran heti perään tämän ansiosta -> ehkä jopa päivittäiskin ajallaan? (koska useEffect, niin KAIKKI muutokset saavat aikaan uudelleenkutsumisen; sekä setHae(false) ETTÄ setHae(true)!)
    }, [hae]) // all of this is ONLY executed if(hae), which is truthy only if input field value has just changed. // if(hae) loppuu tähän!

  return (
    <>
      <div>
        find countries <input value={selectedCountry} onChange={handleCountryChange}></input>
      </div>
      <div>
        <Message message={message}/>
      </div>
      <div>
        {/**<Countries selectedCountry={selectedCountry} allCountries={allCountries} setAllCountries={setAllCountries} message={message} setMessage={setMessage} filteredNames={filteredNames} setFilteredNames={setFilteredNames} hae={hae} setHae={setHae} filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} shownCountry={shownCountry} setShownCountry={setShownCountry} candidateList={candidateList} setCandidateList={setCandidateList} haeKandit={haeKandit} setHaeKandit={setHaeKandit}/> */}
        <Candidates candidateList={candidateList} handleShowButtonClick={handleShowButtonClick}/>
        <Country shownCountry={shownCountry} country={shownCountry}/>
        <Weather shownCountry={shownCountry} shownWeather={shownWeather} setShownWeather={setShownWeather}/>
      </div>
    </>
  )
}

export default App