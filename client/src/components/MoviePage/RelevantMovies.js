import React from 'react'
import {Link} from "react-router-dom";

function RelevantMovies(props) {
    console.log("Inside the RelevantMovies.js");
    const movie = props.movie;
    
    //Add to favourites or watchlist in database
    async function getMovieId(type, movieObj){
        console.log("inside getMovieId Function: ", movieObj);
        let MovieData;
        let postMovieData;

        if(type === "watchlist"){
            MovieData = {
                userId: localStorage.id,
                movieId: movieObj.id,
                title: movieObj.title,
                popularity: movieObj.popularity,
                image: movieObj.poster_path,
                description: movieObj.overview,
                ratings: movieObj.vote_average,
                releaseDate: movieObj.release_date
            }
    
            console.log("Movie Data", MovieData);
            postMovieData = await fetch('/api/watchlistMovie',
            {  
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(MovieData)
            }).then( result=>result.json());
    
            console.log(postMovieData);

        }else if (type === "favourites"){
            MovieData = {
                userId: localStorage.id,
                movieId: movieObj.id,
                title: movieObj.title,
                image: movieObj.poster_path,
                ratings: movieObj.vote_average,
            }
        
            console.log("Movie Data", MovieData);
            postMovieData = await fetch('/api/favourites',
            {  
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(MovieData)
            }).then( result=>result.json());
    
            console.log(postMovieData);
        }   

        if( postMovieData.message ){
            setAlertMessage( { type: 'success', message: postMovieData.message } );
            setTimeout( function(){ setAlertMessage( {} ); }, 3000 );
        } else {
            setAlertMessage( { type: 'danger', message: postMovieData.error } );
            setTimeout( function(){ setAlertMessage( {} ); }, 2500 );
        }


    }

    return (
        <div class="col-md-4 text-center">
            <div class="card mb-4 box-shadow">
                {movie.poster_path && movie.poster_path ? <img style={imgStyle} class="card-img-top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="something" /> : <img style={imgStyle} class="card-img-top" src='https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png'  /> }
                
                <div class="movieDesc" style={movieDesc}> 
                    <h4>{movie.title}</h4>
                    <div class="extra">
                        <Link to={"/movieDetails/" + movie.id }>
                            <button type="button" class="btn btn-outline-primary mr-2">View More</button>
                        </Link>
                        <button type="button" onClick={() => getMovieId("watchlist", movie)} class="btn btn-primary mr-2"><i class="fas fa-bookmark"></i></button>
                        <button type="button" onClick={() => getMovieId("favourites", movie)} class="btn btn-danger mr-2"><i class="far fa-heart"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RelevantMovies
