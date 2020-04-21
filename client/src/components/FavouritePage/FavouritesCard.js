import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

function FavouritesCard(props) {
    const { id } = useParams();
    const imgStyle = {
        objectFit: "cover",
        height: "50vh",
        width: "100%"
    }

    async function deleteMovieFavourite(movieId){
        const removeSpecificMovie = await fetch(`/api/removeFavMovie/${id}/${movieId}`, 
            {
                method: 'DELETE'
            }).then(result => result.json());
            props.getSavedMovieList();
    }

    return (
        <>
        {props.myMovies.map(movie => (
            <div class="movieCard mx-auto" >
                <p class="movieCard-title">MOVIE INFO</p>  
                <div class="movieCrdImg">
                    {movie.image && movie.image!=="null" ? <img style={imgStyle} class="crdImg" src={`https://image.tmdb.org/t/p/w500/${movie.image}`} alt="movie poster" /> : <img style={imgStyle} class="crdImg" src='https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png' alt="movie poster" /> }
                </div>
                <div class="movieCrdDesc">
                    <p class="movieCrdTitle">{movie.title}</p>  
                    <p class="ratngCard">{movie.ratings}</p>
                </div>
                <div class="extra">
                    <a class="btn myBtn mr-2" href={"/movieDetails/" + movie.movieId}> View Detail</a>
                    <button type="button" class="btn myBtn" onClick={() => deleteMovieFavourite(movie._id)} >Delete</button>
                </div>
            </div>
        ))}
        </>
    )
}

export default FavouritesCard
