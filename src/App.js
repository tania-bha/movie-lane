import {useState, useEffect} from 'react';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';

const API_URL='http://www.omdbapi.com?apikey=55bc87f8';

const movie1={
    
        "Title": "Harry Potter and the Deathly Hallows: Part 2",
        "Year": "2011",
        "imdbID": "tt1201607",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
    
}
const App= () =>{

    const [Movies, setMovies]=useState([]);
    const [searchTerm, setSearchTerm]=useState(['']);


    const searchMovies=async(title)=>{

        const response=await fetch(`${API_URL}&s=${title}`);
        const data= await response.json();

        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies('Harry Potter');
    }, []);


    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="search for movies"
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                />

                <img
                src={SearchIcon}
                alt="search"
                onClick={()=>{searchMovies(searchTerm)}}
                />
            </div>

            {
                Movies?.length>0
                ? (
                    <div className="container">

                    {Movies.map((movie)=>(
                        <MovieCard movie={movie}/>
                    ))}             
                    </div>
                ):
                (
                    <div className="empty">
                        <h2>No movies Found</h2>
                        </div>

                )
            }
        </div>
    );
}
export default App;
