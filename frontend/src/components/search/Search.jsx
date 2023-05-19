import { useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi';
import './Search.scss'

const Search = ({className}) => {
    const [search, setSearch] = useState('')

    function handleChange(e) {
        setSearch(e.target.value)
    }

    function handleSearch() {
    }

  return (
    <>
        <div id='search' className={className}>
            <input 
                type="search" 
                name='search' 
                value={search} 
                onChange={handleChange}
                placeholder='What are you looking for?' />
            <button onClick={handleSearch}>
                <BiSearchAlt2 className='search__icon'/>
                <span>Search</span>
            </button>
        </div>
    </>
  )
}

export default Search