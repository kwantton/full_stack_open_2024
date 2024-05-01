import peopleTools from "../services/peopleTools"

const Person = ({iidee, name, number, filter, persons, setPersons, personsNames, setNewPersonsName, message, setMessage}) => {                                // ÄLÄ UNOHDA AALTOSULKUJA... sigh
    if (name.toLowerCase().includes(filter.toLowerCase())) {                // btw, jos filter on "", palauttaa myös true c: kätsää... js ominaisuus
        console.log(`filtterillä "${filter}" löytyi henkilö "${name}"`)
        return (
        
        <li>
          {name} {number} {/** funktio eikä funktiokutsu; siksi () => {...}} */}
          <button onClick={() => peopleTools.remove(iidee, name, persons, setPersons, personsNames, setNewPersonsName, message, setMessage)}
            > delete </button> 
        </li>

        )
    } else {
        console.log(`filtterillä "${filter.toLowerCase()}" ei löytynyt henkilöä ${name}`)
    }
  }
export default Person