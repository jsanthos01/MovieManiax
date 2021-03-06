import React, {useContext, useState} from 'react'
import { useParams } from 'react-router-dom';
import {Link, useLocation} from "react-router-dom";

function MovieList(props) {
    const { id } = useParams();
    const [modalDisplay, setModalDisplay] = useState(false);
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
        const removeSpecificMovie = await fetch(`/api/removeListMovie/${id}/${movieId}`, 
            {
                method: 'DELETE'
            }
        ).then(result => result.json());
        console.log(removeSpecificMovie.message);
        props.getSavedMovieList();
    }

    return (
        <div >
            <div className="container mb-3">
                {props.myMovies.map(movie =>
                    <div className="row" style={rowStyle}>
                        <div className="col-lg-3" style={imageStyle}>
                            {movie.image !== "null" && movie.image ? <img style={imgStyle} class="card-img-top" src={`https://image.tmdb.org/t/p/w500/${movie.image}`} alt="something" /> : <img style={imgStyle} class="card-img-top" src='https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png'  /> }
                            
                        </div>
                        <div className="col-lg-9 d-flex justify-content-center flex-column">
                            <h2 style={{fontWeight:"900"}}><em>{movie.title}</em></h2>
                            <p><b>Overview:</b> {movie.description}</p>
                            <p><b>Rating:</b> <b>{movie.ratings}</b>/10 </p>
                            <p><b>Release Date:</b> {movie.releaseDate}</p>
                            <div class="container d-flex mx-auto ">
                                <a class="btn myBtnPink mr-2" href={"/movieDetails/" + movie.movieId}> View Detail</a>
                                <button type="button" class="btn myBtnPink mr-2" onClick={() => deleteMovieWlist(movie._id)} ><i class="fas fa-trash"></i></button>       
                            </div> 
                        </div>
                
                    </div>
                )}
            </div>
        </div>
    )
}

export default MovieList

