import React, { useEffect, useState } from "react"
import Movies from "../components/Movies"
import { Preloader } from "../components/Preloader"
import { Search } from "../components/Search"

   const API_KEY = process.env.REACT_APP_API_KEY;

   export const Main = () => {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        return() => {
                fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=matrix`)
                 .then(response => response.json())
                 .then((data) => {
                    setMovies(data.Search)
                    setLoading(false)
                 })
                 .catch(()=>{
                    setLoading(false)
                 })
        }
    }, [])
    

    const searchMovies = (str, type = 'all') => {
        setLoading(true);
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${type !=='all' ? `&type=${type}` : ''}`)
         .then(response => response.json())
         .then(data => {
            if (data?.Response === 'True') {
                setMovies(data.Search)
            } else {
                setMovies([])
            }
         })
         .catch(() => { setLoading(false) })
         .finally(() => { setLoading(false) })
    }

        return(
            <main className="content container">  
            <Search searchMovies = {searchMovies}/>    
            {loading ? 
                 <Preloader/>
                : 
                movies.length ? 
                    <Movies movies={movies}/> : <h4>No found</h4>
                     
            }  

            </main>
        )
    
}


