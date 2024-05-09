
import axios from "axios"
const baseURL = "http://localhost:3001/api/persons" // this was modified to /api/persons for the backend c: - just /persons would work with the json-server, but that's not used in the version deployed to Internet

const getAll = () => {
    return axios.get(baseURL).then(response => response.data)
}

const create = newObject => {
    return axios.post(baseURL, newObject).then(response => response.data) // promise, data on muotoa {name:jaska, number:x, id:jotain (serverin asettama!)}. POST tarvii urlin ja objektin
}

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject).then(response => response.data) // put needs a json-object, right?
}

const remove = (iidee, name, persons, setPersons, personsNames, setNewPersonsName, message, setMessage) => {
    if (window.confirm(`Delete user ${name}?`)) {
      console.log("poistetaan käyttäjä", name, ".... . . ")
      axios.delete(`${baseURL}/${iidee}`) // delete ONLY needs the url c:
      .then(response => {
        console.log("response after DELETE", response)
        setPersons(persons.filter(person => person.id !== iidee))
        setNewPersonsName(personsNames.filter(nimi => {
          console.log(`setNewPersonsName: nimi(): ${nimi}, poistettava name.toLowerCase(): ${name.toLowerCase()}`)
          let tulos = nimi !== name.toLowerCase()
          console.log(`oliko eri nimi: ${tulos}`)
          if (!tulos) {
            console.log(`oli samat nimet: ${nimi} ja ${name}: poistetaan ${nimi} persons:ista`)
          }
          return tulos
            }
      ))
        console.log("persons DELETEn jälkeen:", persons)
        console.log("personsNames DELETEn jälkeen:", personsNames)
        setMessage(`Removed ${name} from phonebook`) // CHECK
        setTimeout(() => {          
          setMessage("")        // odottaa 5 sekuntia, minkä jälkeen laittaa viestin arvoksi "null"
        }, 5000)
      })
      .catch(error => {
        console.log(`ei onnistuttu poistamaan id:llä "${iidee}", nimellä "${name}"`)
        alert(`The requested user ${name} could not be found in the database. Please refresh the window :)> `)

      })
    } else {
      console.log("painettiin cancel, ei poisteta käyttäjää")
      
    }
    
}
  
export default { getAll, create, update, remove}