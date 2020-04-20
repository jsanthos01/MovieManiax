import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

function FavouritesCard(props) {
    const { id } = useParams();
    const imgStyle = {
        height: "50vh",
        objectFit: "cover"
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
            <div class="col-md-4" style={{color: "black"}}>
                <div class="card mb-4 shadow-sm">
                {movie.image && movie.image!=="null" ? <img style={imgStyle} class="card-img-top" src={`https://image.tmdb.org/t/p/w500/${movie.image}`} alt="something" /> : <img style={imgStyle} class="card-img-top" src='https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png'  /> }
                    <div class="card-body">
                    <h2 class="card-title"><b>{movie.title}</b></h2>
                        <p class="card-text"><b>Ratings</b>: {movie.ratings}/10</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                            <a class="btn btn-success mr-2" href={"/movieDetails/" + movie.movieId}> View Detail</a>
                                <button type="button" class="btn btn-sm btn-outline-danger" onClick={() => deleteMovieFavourite(movie._id)} >Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </>
    )
}

export default FavouritesCard
