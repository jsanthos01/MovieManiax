import React, {useState, useRef}  from 'react'
import MovieResultPage from './MovieResultPage'

function SearchForm() {
    const [searchInput, setSearchInput] = useState("");
    const [movieList, setMovieList] = useState([]);
    const myRef = useRef(null);

    const style = {
        myForm: {
            width: "70%",
            margin: "50px"
        }, 
        myInput: {
            borderTopLeftRadius: '20px',
            borderRadius: '20px',
            borderBottomLeftRadius: '20px'
        },
        myBtnRgt: {
            width: '150px',
            padding: '10px',
            backgroundColor: '#ed145b',
            borderRadius: '20px',
            marginLeft: '20px',
            cursor: 'pointer',
            border: 'none'
        }

    }

    function handleInputChange(e){
        let newInput = e.target.value;
        setSearchInput(newInput);
    }

    async function loadMovieList(e){
        e.preventDefault();
        const Api = '5b4dbf95cc35d2e911560cca64385e60';
        const newMovieList = await fetch( `https://api.themoviedb.org/3/search/movie?api_key=${Api}&language=en-US&query=${searchInput}&page=1&include_adult=false` ).then( result=>result.json() );
        setMovieList(newMovieList.results);
    }

    return (
        <div>
            <div class="jumbotron jumbotron-fluid hero" >
                <div class="searchBox container">
                    <h1>Enter the Movie Of your Choice</h1>
                    <h4>Discover millions of movies and TV shows. Explore now!</h4>
                    <div class="input-group mb-3 text-center" style={style.myForm}>
                        <input onChange={handleInputChange} value={searchInput} type="text" class="form-control text-center" style={style.myInput} placeholder="Search a movie, TV show ..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <div>
                            <button onClick={loadMovieList} type="submit" style={style.myBtnRgt} className="float-right">
                            Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            { movieList.length > 0 ? <MovieResultPage  movieList={movieList} myRef={myRef} /> : '' }
        </div>
    )
}

export default SearchForm
