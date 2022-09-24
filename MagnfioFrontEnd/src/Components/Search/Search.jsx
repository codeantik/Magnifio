import React, { useState } from 'react';
import Result from './Result';
import './search.css';
import './searchDark.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

export default function Search() {
  const [click, setClick] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handlePostQuery = async () => {
    await axios.post('http://52.90.163.49:443/answer', {
      question: searchQuery,
      company: 'magnifio'
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }


  const handleChange = (e) =>{
    console.log(e)
    if(e.target.value === ''){
      setClick(false)
    } else {
      setClick(true)
    }
    setSearchQuery(e.target.value)
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      handlePostQuery()
      setSearchQuery('')
    }
  }

  return (
    <div className="search-container" >
      <h1 className="search-bar-company-logo">Magnif.io</h1>
      <div className="Search-bar">
        <SearchIcon className="search-icon"/>
        <input 
          value={searchQuery}
          type="Search" 
          placeholder="Search" 
          onChange ={handleChange} 
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className={ click ? 'search-suggestion' : 'search-suggestion-show'}></div>
      {/* <div className="show-result">
        <Result/>
      </div> */}
    </div>
  );
}
