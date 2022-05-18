import React, { useEffect, useState } from "react"
import Movies from "../components/Movies"
import { Preloader } from "../components/Preloader"
import { Search } from "../components/Search"

   const API_KEY = process.env.REACT_APP_API_KEY;

   export class Main extends React.Component {

    state = {
            movies: [],
            loading: false
        }

    
    componentDidMount(){
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=matrix`)
         .then(response => response.json())
         .then(data => this.setState({movies: data.Search}))
    }

    searchMovies = (str, type = 'all') => {
        this.setState({ loading: true });
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${type !=='all' ? `&type=${type}` : ''}`)
         .then(response => response.json())
         .then(data => {
            if (data?.Response === 'True') {
                this.setState({movies: data.Search})
            } else {
                this.setState({movies: [] })
            }
         })
         .catch((error) => console.log('error: ', error))
         .finally(() => { this.setState({ loading: false }); })
    }

    render() {
 
        const { loading, movies} = this.state;
        return(
            <main className="content container">  
            <Search searchMovies = {this.searchMovies}/>    
            {loading ? (
                 <Preloader/>
            ) : (
                movies.length ? (
                    <Movies movies={this.state.movies}/>
                    ) : <h4>No found</h4>
            )}  

            </main>
        )
    }
    
}

// export const Main = () => {
//         const[ state, setState] = useState([])
//         useEffect(()=>{
//             fetch('http://www.omdbapi.com/?apikey=a70812d9&s=matrix')
//              .then(response => response.json())
//              .then(data=>setState(data.Search)) 

//         },[])

//          const {movies} = state;
//          return(
//              <main className="content container">  
//              <Search/>      
//               {
//                  state.length ? (<Movies movies={state}/>)
//                  : <Preloader />
//               } 
//              </main>
//          )
//         }

