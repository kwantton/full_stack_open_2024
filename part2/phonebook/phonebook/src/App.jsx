import { useEffect, useState } from 'react'
//import Person from "./components/Person"
import AddNewName from "./components/AddNewName"
import Numbers from "./components/Numbers"
import peopleTools from "./services/peopleTools"                                     // imports getAll(), create(), update(); for interacting with the json-server
import Message from "./components/Message"

const App = () => {
  const [persons, setPersons] = useState([])                                      // aluksi tyhjä; peopleServicellä haetaan json-serveriltä, jota hostataan portilla 3001 (katso materiaali jos et muista c:)
  const [personsNames, setNewPersonsName] = useState([])                          // PELKÄT nimet lowercase. Tätä käytetään, kun tarkastetaan, voidaanko lisätä uusi nimi, vai onko se jo olemassa puhelinluettelossa. Tämä jatkuva kerääminen on suorityskyvyn kannalta parempi kuin se että joka kerta kun yritetään lisätä, pitäisi erikseen käydä kaikki person:it läpi ja kerätä niistä pelkät nimet (eli ei tarvitse MUODOSTAA listaa joka kerta, kun pidetään tätä yllä).
  const [newName, setNewName] = useState('')                                      // ei mitään listaa tähän tietenkään; tähän tulee uuden nimi aina c: "The newName state is meant for controlling the form input element."
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')                                        // defaulttina ei filtteriä, näytetään kaikki
  const [message, setMessage] = useState('')
  
  // haetaan backendistä (json-server) kaikki
  useEffect(() => {                                                               // effectHook, joka käyttää axiosta (joka kai on vaan Fetch-modaus) hakemaan tässä json:in, jossa on ekat nimet (tiedostosta db.json, joka asuu "serverinä" json-server localhostissas portissa 3001, jos olet sen käynnistänyt oikein!)
    console.log("Hello from useEffect!")
    peopleTools.getAll()                                                                    // old version: //axios.get("http://localhost:3001/persons")
    .then(people => {
      console.log("-people:", people)
      setPersons(people)
      console.log("-persons:", persons)
      people.map(dude => {
        console.log("-lisättävä nimi:", dude.name.toLowerCase())
        const personsNamesCopy = personsNames // pakottaa päivittämään! c:
        personsNamesCopy.push(dude.name.toLowerCase())
        setNewPersonsName(personsNamesCopy) // tätä EI näköjään voi laittaa suoraan personsNames.concat(dud.name.toLowerCase()):nä; varmaan asyncin takia ei päivitä joka kerta statea! Testaa ihmeessä ja katso console.log... sinne ei päivity mitään jos näin yritetään tehdä :c
        console.log("-personsNames lisäyksen jälkeen:", personsNames)
      })
    })
  }, []) // [] toisena argumenttina varmistaa, että ajetaan vain kerran! T. materiaali..
  
  const handleFilter = (event) => { // tämä PÄIVITTÄÄ filterin. Se KÄSITELLÄÄN Personissa
    console.log(`Hello from handleFilter!
    event.currentTarget, joka tulee välittömästi olemaan voimassaoleva filter: ${event.currentTarget}`)
    setFilter(event.currentTarget.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(`Hello from handleNumberChange!
    -event.currentTarget.value, josta tulee uusi newNumber:
    ${event.currentTarget.value}`)
    setNewNumber(event.currentTarget.value)
  }
  
  const handleNameChange = (event) => {
    console.log(`Hello from handleNameChange!
    -event.currentTarget.value, josta tulee uusi newName:
    ${event.currentTarget.value}`)
    setNewName(event.currentTarget.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault() // ettei ladata sivua uudestaan!
    console.log("Hello from addName! Form sent, and event.currentTarget: ", 
    event.currentTarget)

    const newPersonObject = {
      // id haetaan alla json-serveriltä POST:in paluuarvosta.                                  Vanha oli //id: persons.length+1,
      name : newName, // this is constantly async updated via the handlNameChange! c:
      number: newNumber
    }
    
    // tarkistetaan, löytyykö nimistä sitä, jota nyt yritetään lisätä
    console.log("-personsNames before attempting to add a new one:", personsNames)
    let consoleMessage
    if(personsNames.includes(newPersonObject.name.toLowerCase())) {
      if(window.confirm(`"${newPersonObject.name}" is already added to the phonebook, replace
      the old number with a new one?`)) {
        let updateePerson = {...persons.find(dude => dude.name.toLowerCase() === newPersonObject.name.toLowerCase())} // shallow copy! Ei saa mutatoida suoraan statea!
        console.log(`updateePerson:`, updateePerson)
        updateePerson.number = newNumber // tehtiin yllä shallow, joten tämä on ok! c:
        console.log(`updateePerson.number: ${updateePerson.number}`)
        console.log(`updateePerson.id: ${updateePerson.id}`)
        
        peopleTools.update(updateePerson.id, updateePerson)
        .then(data => {
          console.log("PUT:in data:", data)
          console.log("persons:",persons)
          setPersons(persons.map(dude => {
            console.log("persons.map, dude:",dude)
            console.log("dude.id:", dude.id)
            if(dude["id"] !== updateePerson["id"]) {
              console.log("id:t eivät olleet samat")
              return dude
            } else {
              console.log("id:t olivat samat:", dude.id)
              return updateePerson
            } // if the id's match, then change that person (with the new number, that is!)
          }))
        })
        .catch(error => {
          console.error(error)
        })
        consoleMessage = `lisättiin ${updateePerson}`
        setMessage(`Contact ${updateePerson.name}'s number updated`) // CHECK
        setTimeout(() => {          
          setMessage("")        // odottaa 5 sekuntia, minkä jälkeen laittaa viestin arvoksi "null"
        }, 5000)
      }
    } else { // jos UUSI nimi, jota ei ole vielä phonebookissa: id-arvo pitää hakea serveriltä, koska serveri asettaa id:n!
      peopleTools.create(newPersonObject) // POST, jonka paluuarvona on RESTin mukaan pelkkä ihminen, muotoa {name:jaska,number:1213,id:serverin_antama_nimi}
      .then(person => {
        console.log("-person, serveriltä POST:in responsessa (id on serverin antama!): ", person)
        setPersons(persons.concat(person)) // tallenna json-serverille; post -> paluuarvosta id-tieto c:
        setNewPersonsName(personsNames.concat(newPersonObject.name.toLowerCase()))
        consoleMessage = `lisättiin ${person}`
        
        setMessage(`Added ${person.name} to phonebook`) // CHECK
        setTimeout(() => {          
          setMessage("")        // odottaa 5 sekuntia, minkä jälkeen laittaa viestin arvoksi "null"
        }, 5000)
        }
      )
    }
    
    let updatedpersons = persons // without this, the update will not necessarily be seen right away since async!!
    //console.log(`-${consoleMessage}. Persons nyt: `, updatedpersons)
    setNewName("") // nollataan input-kentän value
    setNewNumber("")
    //setNewPersonsName
  }

  return (
    <div>
      <h2 class="mainheader">Phonebook</h2>
      <div>
        <p>filter by name:</p>
        <input value={filter} onChange={handleFilter}/>
      </div>
      
      <h3> add a new name </h3>
      <AddNewName addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <div>
        <Message message={message}/>
      </div>

      <h3>Numbers</h3>
      <Numbers persons={persons} setPersons={setPersons} personsNames={personsNames} setNewPersonsName={setNewPersonsName} filter={filter} message={message} setMessage={setMessage}/>
    </div>
  )
}

export default App
//