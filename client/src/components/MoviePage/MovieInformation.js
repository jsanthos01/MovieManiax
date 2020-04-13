import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

function MovieInformation() {
    const {id} = useParams();
    const [movieDetails, setMovieDetails] = useState([]);
    const [movieTrailer, setMovieTrailer]= useState([]);
    
    console.log("Inside the movieInfo Page!!!!");
    console.log(`Id of movie is: ${id}`);
    
    async function loadMovieDetails(){ 
        //Movie Details and Cast Members
        const apiMovie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5b4dbf95cc35d2e911560cca64385e60&language=en-US&append_to_response=credits`).then( result=>result.json() );
        console.log("apiMovie", apiMovie);
        setMovieDetails( apiMovie );

        //Movie Trailer Videos
        const apiMovieTrailer = await fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=5b4dbf95cc35d2e911560cca64385e60`).then( result=>result.json() );      
        console.log( 'apiMovieTrailer key: ', apiMovieTrailer);
        setMovieTrailer( apiMovieTrailer.results );
    }

    useEffect(function(){
        loadMovieDetails();
    },[])

    return (
        <div class='container'>
            <div class='row'>
                <div class='col-md-4' >
                {movieDetails.poster_path && movieDetails.poster_path ? <img style={{width: '100%'}} src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt="movie img" /> : <img src='https://cdn1.vectorstock.com/i/800x1000/21/85/white-blank-book-cover-isolated-template-empty-vector-25362185.jpg'  /> }
                
                {/* THIS YOUTUBE LINK IS DONE WRONG... MUST BE CHANGED!!!!! */}
                <a href={`https://www.youtube.com/embed/${movieDetails.key}`}><button class="btn btn-outline-danger mr-3 mt-3">Watch Trailer</button></a>

                </div>
                <div class='col-md-8'>

                    <h1>{movieDetails.title}</h1>
                    <h4 style={{color:"white", fontStyle: "italic"}}>"{movieDetails.tagline}"</h4>
                    <button class="btn btn-outline-danger mr-3 mt-3"><i class="fas fa-heart"></i> Favourites</button>
                    <button class="btn btn-outline-primary mt-3"><i class="fas fa-plus"></i>  Watch List</button>
                    <div>
                        <ul class="list-group">
                            <li class="list-group-item" style={listGroupItem}> <i class="fas fa-star"></i> {movieDetails.vote_average}/10</li>
                            <li class="list-group-item" style={listGroupItem}>
                                    Rate This Movie: 
                                <div class="d-flex" style={{color:"#ffeb3b"}}>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                </div>
                            </li>
                            <li class="list-group-item" style={listGroupItem}><i class="fas fa-clock"></i> RunTime: {movieDetails.runtime} min</li>

                        </ul>
                    </div>
                    <div class="container" style={{color:"white"}}>
                        <h5>OVERVIEW</h5>
                        <p>{movieDetails.overview}</p>
                    </div>
                    <div class="container" style={{color:"white"}}>
                        <h5>GENRE</h5>
                        {movieDetails && movieDetails.genres ? <p>{movieDetails.genres.map( genre =><span class="badge badge-primary mr-2" style={{padding: "10px"}}>{genre.name}</span>)} </p> : '[no genre list]' }
                    </div>
                </div>
        
            </div>
            <div class="container-fluid mt-5">
                <h2>Cast</h2>
                <div class="row">

                {movieDetails && movieDetails.genres ? 
                <div class="row">{movieDetails.credits.cast.slice(0,10).map( actor =>
                    <div class="mt-3 mr-3 mx-auto">
                        <img style={{width: '30vh', height: '30vh', objectFit: 'cover',  borderRadius: '10px 10px 0 0 '}} src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt="movie img" />
                        <p class="list-group-item">{actor.name}</p>
                    </div> 

                )} 
                </div> : '[no cast members]' }

                </div>
            </div>
            <div class="container-fluid mt-5">
                <h2>Trailers</h2>
                <div class="row justify-content-center">                    
                {movieTrailer.slice(0,3).map(movie => 
                    <div class="mr-4 mt-4">
                        <iframe width="340" height="215" src={`https://www.youtube.com/embed/${movie.key}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>)}
                </div>
            </div>
            
        </div>
    )
}

export default MovieInformation
