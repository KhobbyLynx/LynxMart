import React, { useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { MdClear } from 'react-icons/md'
import { useNavigate, useSearchParams } from 'react-router-dom'

import './Search.scss'

const Search = ({ className }) => {
   const [searchParams, setSearchParams] = useSearchParams()
   const [searchValue, setSearchValue] = useState('')
   const navigate = useNavigate()

   const handleSearchChange = (e) => {
      setSearchValue(e.target.value)
   }

   const handleFilterChange = () => {
      if (searchValue === '') {
         if (searchParams.has('q')) {
            searchParams.delete('q')
            setSearchParams(searchParams)
         }
      } else {
         navigate(`/shop?q=${searchValue}`)
      }
   }

   const handleClearSearch = () => {
      searchParams.delete('q')
      setSearchParams(searchParams)
      setSearchValue('')
   }

   const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
         handleFilterChange()
      }
   }

   return (
      <div id='search' className={className}>
         <div className='search__container'>
            <input
               type='text'
               value={searchValue}
               onChange={handleSearchChange}
               onKeyPress={handleKeyPress}
               placeholder='What are you looking for?'
               required
               className='search__input'
            />
            {searchValue && (
               <MdClear className='clear__search' onClick={handleClearSearch} />
            )}
         </div>
         <button onClick={handleFilterChange}>
            <BiSearchAlt2 className='search__icon' />
            <span>Search</span>
         </button>
      </div>
   )
}

export default Search
