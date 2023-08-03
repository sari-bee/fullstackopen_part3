const Filter = ({searchPhrase, handleSearchChange}) => {
  return (
    <><form>
      filter shown with <input value={searchPhrase} onChange={handleSearchChange}/>
    </form></>
  )
}

export default Filter