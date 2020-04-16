import React, {useContext} from 'react'
import { useParams } from 'react-router-dom';
import {Link, useLocation} from "react-router-dom";
function MovieList(props) {
    const { id } = useParams();
    console.log("Inside the saved movie List page");
    console.log(props.myMovies);
    
    const imageStyle={
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        alignItems: "center",
        flexDirection: "column"
    }
    const imgStyle = {height: "40vh", objectFit: "cover", paddingBottom: "10px"}
    const rowStyle={marginBottom: "60px"}

    async function deleteMovieWlist(movieId){
        console.log("[deleteMovieWlist] function");
        const removeSpecificMovie = await fetch(`/api/removeListMovie/${id}/${movieId}`, 
            {
                method: 'DELETE'
            }).then(result => result.json());
            console.log(removeSpecificMovie.message);
            props.getSavedMovieList();
    }

    return (
        <div >
            <div className="container mb-3">
                {props.myMovies.map(movie =>
                    <div className="row" style={rowStyle}>
                        <div className="col-lg-3" style={imageStyle}>
                            {movie.image && movie.image ? <img style={imgStyle} class="card-img-top" src={`https://image.tmdb.org/t/p/w500/${movie.image}`} alt="something" /> : <img style={imgStyle} class="card-img-top" src='https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png'  /> }
                            <a href="Www.google.com" ><button type="button" class="btn btn-danger mr-2"><i class="fas fa-play"></i> Watch Trailer</button></a>

                        </div>
                        <div className="col-lg-9 d-flex justify-content-center flex-column">
                            <h2 style={{fontWeight:"900"}}><em>{movie.title}</em></h2>
                            <p><b>Overview:</b> {movie.description}</p>
                            <p><b>Rating:</b> <b>{movie.ratings}</b>/10 </p>
                            <p><b>Release Date:</b> {movie.releaseDate}</p>
                            <div class="container d-flex mx-auto ">
                                <Link to={"/movieDetails/" + movie.movieId }>
                                    <button type="button" class="btn btn-outline-primary mr-2">View</button>
                                </Link>
                                <button type="button" class="btn btn-sm btn-outline-danger" onClick={() => deleteMovieWlist(movie._id)} >Delete</button>
                            </div>
                        </div>
                
                    </div>
                )}
            </div>
        </div>
    )
}

export default MovieList

