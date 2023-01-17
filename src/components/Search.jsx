import React, {useState} from "react";

export const Search = ({searchMovies}) => {

    const [search, setSearch] = useState('')
    const [type, setType] = useState('all')


    const handleKey = (event) => {
        if(event.key === 'Enter'){
            searchMovies(search, type)
        }
    }

    const handleFilter = (event) => {
        setSearch(()=>({type: event.target.dataset.type}), ()=>{
            searchMovies(search, type)
        })

    }
        return(
            <div className="row">
                <div className="input-field">
                    <input 
                        placeholder="search" 
                        type="search" 
                        className="validate"
                        value={search}
                        onChange={(e) => setSearch({search: e.target.value})}
                        onKeyDown={handleKey}
                    />
                    <button className="waves-effect waves-light search-btn btn"
                            onClick={() => searchMovies(search, type)}
                    >
                        Search
                    </button> 
                    <div>
                        <label>
                          <input
                                className="with-gap" 
                                name="type" 
                                type="radio" 
                                data-type ='all'
                                onChange={handleFilter}
                                checked={type === 'all'}
                           />
                          <span>All</span>
                        </label> 
                        <label>
                          <input 
                                className="with-gap"
                                name="type" 
                                type="radio" 
                                data-type ='movie'
                                onChange={handleFilter}
                                checked={type === 'movie'}
                          />
                          <span>Movies only</span>
                        </label>
                        <label>
                          <input 
                                className="with-gap"
                                name="type" 
                                type="radio" 
                                data-type ='series'
                                onChange={handleFilter}
                                checked={type === 'series'}
                          />
                          <span>Series only</span>
                        </label>
                    </div>  
                </div>
            </div>
        )
}