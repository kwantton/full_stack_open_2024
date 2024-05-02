import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = import.meta.env.VITE_SOME_KEY // see material https://fullstackopen.com/en/part2/adding_styles_to_react_app#couple-of-important-remarks bottom of the page for explanation! c: This ONLY works if you have set it up when running the server (the server on port 5173 or some other)
const exampleCall = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=507434a197f8adaf23ecdc7cc52c912f"
const exampleDestination = "London,uk"
const exampleCallConstruct = `${baseUrl}${exampleDestination}&APPID=${apiKey}`

const getWeather = (dot_capital, dot_tld_0_substring_1) => { // muotoa Pääkaupunki,maatunnus. Esim. London,uk tulee countryServices https://studies.cs.helsinki.fi/restcountries/api/name/finland
    const url = `${baseUrl}${dot_capital},${dot_tld_0_substring_1}&APPID=${apiKey}`
    console.log("hello from getWeather! total url:",url)
    return axios.get(url, {headers : {
        'Content-Type':"application/json"
    }}) //this is essentially a manual to how to use this. .tld[0].substring(1) should choose "fi", "se", "uk" etc! .capital should choose "Helsinki", "Stockholm" etc!
    .then(response => {
      console.log("getWeather: response:", response)
      return response.data})
}

/*const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
  .then(response => response.data) // returns a promise with JUST the data
} */

export default getWeather