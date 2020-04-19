import React, { useState, useEffect } from 'react'
import MovieList from '../../SearchMoviePage/MovieResultPage'

function Upcoming() {
    const [movieList, setMovieList] = useState([]);
    async function loadMovie(){
        const apiKey = '5b4dbf95cc35d2e911560cca64385e60';
        const apiUpcoming = await fetch(`
        https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`).then( result=>result.json() );
        console.log('apiUpcoming: ',apiUpcoming.results)
        setMovieList(apiUpcoming.results);
    }

    useEffect( function(){
        loadMovie();
    }, [] );

    return (
        <div>
            <h3 class="text-center mb-4" style={{color: 'white'}}>Upcoming  Movies</h3>

            <MovieList movieList={movieList}></MovieList>
        </div>
    )

}

export default Upcoming
