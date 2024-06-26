import { useEffect, useState } from 'react'
import countryServices from './services/countryServices.js'
import weatherServices from './services/weatherServices'

const Message = ({message}) => {
  return (
    <p>{message}</p>)
}

const Weather = ({shownCountry, shownWeather, temp, iconUrlSnippet, wind}) => {
  
  if(shownCountry === null) {
    console.log("Weather: shownCountry === null, palataan")
    return ""}
  
  if(shownWeather === null) {
    console.log("Weather: shownWeather === null, palataan")
    return ""
  }

  console.log(`hello from Weather(${(shownCountry.name.common)})!`)
  //return (<div>moro :D</div>)
  console.log("Weather: palautetaan shownWeather:", shownWeather)
  console.log(`weatherServices.getIconUrl(iconUrlSnippet): ${weatherServices.getIconUrl(iconUrlSnippet)}`)
  return (
    <div>
      <h2> Weather in {shownCountry.capital}</h2>
      <p>temperature {temp.toFixed(2)} Celcius</p>
      <img src={`${weatherServices.getIconUrl(iconUrlSnippet)}`} alt="weather icon"/>
      <p>wind {wind} m/s</p>
      {/**shownWeather*/} {/** this would say "moro" */}
    </div>
  )
}

const Candidates = ({candidateList, handleShowButtonClick}) => {
  console.log("hello from candidates! candidateList:", candidateList)
  if (candidateList === null) {return ""}
  
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

      <h3>languages</h3>
      <ul>
        {languages.map(language => 
        <li>{language}</li>)}
      </ul>
      <p></p> {/** some space c: */}
      <img src={`${country.flags.svg}`} width={200} height={"auto"}/>
    </div>
  )
}

function App() {
  const[selectedCountry, setSelectedCountry] = useState('')
  const[allCountries, setAllCountries] = useState([]) // the dream was to save all data here after the first fetch, but I didn't do that. This should be done IRL to conserve resources and improve performance.
  const[hae, setHae] = useState(false) // jos tämän laittaa default true, hakee noin 1500 kertaa ennen kuin edes osaa päivittää itsensä falseksi... huokaus
  const[message, setMessage] = useState("")
  const[filteredNames, setFilteredNames] = useState([])
  const[filteredCountries, setFilteredCountries] = useState([])
  const[shownCountry, setShownCountry] = useState(null)
  const[shownWeather, setShownWeather] = useState(null)
  const[candidateList, setCandidateList] = useState([])
  const[temperature, setTemperature] = useState(0)
  const[iconUrlSnippet, setIconUrlSnippet] = useState("")
  const[wind, setWind] = useState(0)

  const handleCountryChange = event => {
    setMessage("") // on kivempi, että viesti häviää näkyvistä kirjoittamisen ajaksi. Tämä myös varmistaa resettauksen tilanteessa, jossa mennään "no matches found":ista tyhjään kenttään.
    console.log("value:",event.currentTarget.value)
    setSelectedCountry(event.currentTarget.value)
    setShownCountry(null) // ettei näytetä ikusesti
    setHae(!hae) // lähdetään hakemaan sisältöä Countries-osastolla. HUOM! Jos tähän laittaa true, niin vähemmän turhia uudelleenlatauksia - MUTTA tällöin ongelmaksi muodostuu tapaus, jossa kirjoitetaan jotain mikä ei matchaa ja heti perään poistetaan kaikki input-kentästä (hakukentästä); tällöin voidaan jäädä ikuisesti jumiin tilaan "no matches found"
  }

  const handleShowButtonClick = (officialName) => {
    console.log("show-button clicked! Name of the Country:", officialName)
    console.log("filtered countries:", filteredCountries)
    const matchingCountry = filteredCountries.find(country => country.name.official === officialName)
    console.log("matching country:", matchingCountry) // this is the country we wanna show c:
    //const countryToShow = <Country country={matchingCountry}/> // tehääs tästä state, joka näytetään
    setShownCountry(matchingCountry) 
    
    // update temp and icon
    // COPY-PASTE from the situation where there is only 1 country in the results, further below
    const capital = matchingCountry.capital
      const countryAbbreviationTwoLetters = matchingCountry.tld[0].substring(1)
      weatherServices.getWeather(capital, countryAbbreviationTwoLetters)
      .then(data => {
        console.log("handleShowButtonClick: säädata:",data)
        console.log("handleShowButtonClick: säädata.weather[0].icon:",data.weather[0].icon)
        const iconUrlSnippet = data.weather[0].icon // the name of the icon
        setIconUrlSnippet(iconUrlSnippet)  // so that Weather can GET the icon png

        console.log("handleShowButtonClick: säädata.main.temp-273.15 =", data.main.temp-273.15)
        setTemperature(data.main.temp-273.15)
        setWind(data.wind.speed)
        console.log("handleShowButtonClick: laitetaan moro:D shownWeatheriksi")    
        setShownWeather("moro")
      })
      .catch(error => console.error("virhe Weather:in then:issä!:", error))
  }
  
  useEffect(() => { // ...}, [hae] //  < waaaaay below: all of this is ONLY executed if state variable "hae" changes. The "hae" is truthy only if input field value has just changed, but that doesn't really matter (truthy vs. falsy doesn't matter anymore).
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
      
      // weather part, when there's only 1 country:
      const capital = filteredMaat[0].capital
      const countryAbbreviationTwoLetters = filteredMaat[0].tld[0].substring(1)
      weatherServices.getWeather(capital, countryAbbreviationTwoLetters)
      .then(data => {
        console.log("säädata:",data)
        console.log("säädata.weather[0].icon:",data.weather[0].icon)
        console.log("säädata.main.temp-273.15 =", data.main.temp-273.15)
        const iconUrlSnippet = data.weather[0].icon // the name of the icon
        setIconUrlSnippet(iconUrlSnippet)  // so that Weather can GET the icon png
        setTemperature(data.main.temp-273.15)
        setWind(data.wind.speed)
        console.log("laitetaan moro:D shownWeatheriksi")    
        setShownWeather("moro")
      })
      .catch(error => console.error("virhe Weather:in then:issä!:", error))
    

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
    } else { // if there are 0 matching names, reset stuff
      setMessage("no matches, please try another input")
      setShownCountry(null)
      setFilteredNames([])
      setFilteredCountries([])
      setCandidateList([])
      //setHae(!hae) // tällä lailla saadaan ekstraluuppi
    }
  }) //.then loppuu näihin
  
  console.log("filteredNames:", filteredNames)
    setHae(false)  // tämä näköjään on pakollinen (koska useEffect, niin KAIKKI muutokset saavat aikaan uudelleenkutsumisen; sekä setHae(false) ETTÄ setHae(true)!)
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
        <Candidates candidateList={candidateList} handleShowButtonClick={handleShowButtonClick}/>
        <Country shownCountry={shownCountry} country={shownCountry}/>
        <Weather shownCountry={shownCountry} shownWeather={shownWeather} temp={temperature} iconUrlSnippet={iconUrlSnippet} wind={wind}/>
      </div>
    </>
  )
}

export default App