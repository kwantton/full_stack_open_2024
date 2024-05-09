import Person from "./Person"

const Numbers = ({persons, filter, setPersons, personsNames, setNewPersonsName, message, setMessage}) => {
    return(
    <ul>
    {
      persons.map(person => 
      <Person key={person.id} iidee={person.id} name={person.name} number={person.number} filter={filter} persons={persons} setPersons={setPersons} personsNames={personsNames} setNewPersonsName={setNewPersonsName} message={message} setMessage={setMessage}/>
    )}
    </ul>
    )
}

export default Numbers