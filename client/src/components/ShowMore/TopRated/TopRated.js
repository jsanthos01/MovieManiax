import React, { useState, useEffect } from 'react'
import MovieList from '../../SearchMoviePage/MovieResultPage'
function TopRated() {
    const [movieList, setMovieList] = useState([]);
    async function loadMovie(){
        const apiKey = '5b4dbf95cc35d2e911560cca64385e60';
        const apiPopular = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`).then( result=>result.json() );
        setMovieList(apiPopular.results);
    }

    useEffect( function(){
        loadMovie();
    }, [] );

    return (
        <div >
            <h3 class="text-center mb-4 moreHeads" style={{color: 'white'}}>Top Rated Movies</h3>
            <MovieList movieList={movieList}></MovieList>
        </div>
    )
    }

export default TopRated
