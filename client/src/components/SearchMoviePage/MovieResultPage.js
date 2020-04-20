import React,{ useState } from 'react'
import { Link } from "react-router-dom";

function MovieResultPage(props) {
    console.log("Inside the MovieResult", props.movieList);
    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );
    const resultArray = props.movieList;

    const style = {
        messageStyle: {
            background: '#26b3b8',
            color: 'white',
            position: 'sticky',
            top: '0',
            left: '0',
            zIndex: '10'
        },
        imgStyle: {
            objectFit: "cover",
            height: "50vh",
            width: "100%"
        },
        movieDesc: {
            color: "black",
            padding: "10px"
        }
    }
    
    async function getMovieId(type, movieObj){
        let MovieData;
        let postMovieData;

        if(localStorage.id){
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
                postMovieData = await fetch(`/api/watchlistMovie/`,
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
                setAlertMessage( { type: 'danger', message: postMovieData.message } );
                setTimeout( function(){ setAlertMessage( {} ); }, 2500 );
            }
        }else {
            setAlertMessage( { type: 'danger', message: "Please signin to add to your favourites or watchlist!" } );
            setTimeout( function(){ setAlertMessage( {} ); }, 3000 ); 
        }

    }
    return (
        <div>
            <div style={style.messageStyle} className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">
                {alertMessage.message}
            </div>
            <div className="container ">
                <div class="row">
                    {resultArray.map(movie => 
                        <div class="movieCard mx-auto" >
                            <p class="movieCard-title">MOVIE INFO</p>  
                            <div class="movieCrdImg">
                                {movie.poster_path && movie.poster_path ? <img style={style.imgStyle} class="crdImg" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie poster" /> : <img style={style.imgStyle} class="crdImg" src='https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png' style={style.imgStyle} /> }
                            </div>
                            <div class="movieCrdDesc">
                                <p class="movieCrdTitle">{movie.title}</p>  
                                <p class="ratngCard">{movie.vote_average}</p>
                            </div>
                            <div class="extra">
                                <Link to={"/movieDetails/" + movie.id }>
                                    <button type="button" class="btn myBtn mr-2">View More</button>
                                </Link>
                                <button type="button" onClick={() => getMovieId("watchlist", movie)} class="btn  myBtn mr-2"><i class="fas fa-bookmark"></i></button>
                                <button type="button" onClick={() => getMovieId("favourites", movie)} class="btn myBtn mr-2"><i class="far fa-heart"></i></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieResultPage
