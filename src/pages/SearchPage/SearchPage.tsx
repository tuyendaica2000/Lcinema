import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'


import classes from './SearchPage.module.scss'


const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [mess, setMess] = useState('');

    const handleSearch: () => void = () => {
        if(query === '') {
            setMess('Type something to search');
        } else {
            setMess('');
        }
    }
    
    return (
        <div className={classes.search_bar}>
            <h2 className={classes.search_bar_title}>
                Find your favorite movies and TV shows
            </h2>
            <div className={classes.search_bar_input}>
                <input 
                    type="text" 
                    placeholder="Search Here" 
                    className={classes.search_bar_input_item}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <Link to={`/search/${query}`} className={classes.search_bar_input_icon} onClick={handleSearch}>
                    <BsSearch />
                </Link>
                {mess !== '' && <p>{mess}</p>}
            </div>
        </div>
    )
}

export default SearchPage
