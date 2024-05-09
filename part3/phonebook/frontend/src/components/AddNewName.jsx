const AddNewName = ({addPerson, newNumber, newName, handleNameChange, handleNumberChange}) => {
return (
  <form onSubmit={addPerson}>     {/** before this, the handleNameChange has happened below c: addPerson uses newName and newPerson, both of which are updated by the handleNameChange and handleNumberChange */}
    <div>
      name: 
      <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number:
      <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <button type="submit" >add</button>     
  </form>
)}

export default AddNewName