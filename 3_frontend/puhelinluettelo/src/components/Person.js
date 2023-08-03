const Person = ({name, number, deleteItem}) => {
  return (
    <>
    {name} {number} <button onClick={deleteItem}>Delete</button><br/>
    </>
  )
}

export default Person