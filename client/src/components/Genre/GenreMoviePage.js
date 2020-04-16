import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import MovieList from '../SearchMoviePage/MovieResultPage'
function GenreMoviePage() {
    const { id } = useParams();
    console.log("id: ", id);
    const [movieList, setMovieList] = useState([]);
    async function loadMovie(){
        console.log('card clicked with genre id: ', id)
        const apiKey = '5b4dbf95cc35d2e911560cca64385e60';
        const apiGenres = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&vote_average.gte=6&with_genres=${id}`).then( result=>result.json() );
        console.log('apiGenres: ',apiGenres.results)
        setMovieList(apiGenres.results);
    }

    useEffect( function(){
        loadMovie();
    }, [] );

    return (
        <div>
            <MovieList movieList={movieList}></MovieList>
        </div>
    )
}

export default GenreMoviePage
