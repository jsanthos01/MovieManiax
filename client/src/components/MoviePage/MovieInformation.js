import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";

function MovieInformation() {
    const { id } = useParams();
    const [ movieDetails, setMovieDetails ] = useState([]);
    const [ movieTrailer, setMovieTrailer ]= useState([]);
    const [ similarMovies, setSimilarMovies ]= useState([]);
    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );
    const [ isNotLoggedIn, setIsNotLoggedIn ] = useState( false );
    const movieStyle = {
        listGroupItem: {backgroundColor: "transparent", borderRadius: "0", color: "#fff"},
        h4Style: {color:"white", fontStyle: "italic"},
        castImage: {width: '30vh', height: '30vh', objectFit: 'cover',  borderRadius: '10px 10px 0 0 '},
        castText: {color: "black", textAlign: "center"},
        imgStyle :{height: "50vh",objectFit: "cover"},
        cardBody: {height: "30vh",display: "flex",flexDirection: "column", justifyContent: "center"},
        movieDesc: {color: "black",padding: "10px"},
        messageStyle: {position: 'sticky',top: '0',left: '0'}
    }
    const style = {
        messageStyle: {
            width: '80%',
            border: 'none',
            background: '#26b3b8',
            color: 'white',
            position: 'sticky',
            top: '0',
            left: '0',
            zIndex: '10',
            margin: '0 auto'
        },
        imgStyle: {
            objectFit: "cover",
            height: "60vh",
            width: "100%"

        },
        movieDesc: {
            color: "black",
            padding: "10px"
        }
    }
    
    //Making API calls
    async function loadMovieDetails(){ 
        //Movie Details and Cast Members
        const apiMovie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5b4dbf95cc35d2e911560cca64385e60&language=en-US&append_to_response=credits`).then( result=>result.json() );
        setMovieDetails( apiMovie );

        //Movie Trailer Videos
        const apiMovieTrailer = await fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=5b4dbf95cc35d2e911560cca64385e60`).then( result=>result.json() );      
        setMovieTrailer( apiMovieTrailer.results );

        //Similar Movies List
        const apiSimilarMovies = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=5b4dbf95cc35d2e911560cca64385e60&language=en-US&page=1`).then( result=>result.json() );      
        setSimilarMovies( apiSimilarMovies.results );
    }

    useEffect(function(){
        loadMovieDetails();
    },[])

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
    
                postMovieData = await fetch('/api/watchlistMovie',
                {  
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(MovieData)
                }).then( result=>result.json());

            }else if (type === "favourites"){
                MovieData = {
                    userId: localStorage.id,
                    title: movieObj.title,
                    image: movieObj.poster_path,
                    ratings: movieObj.vote_average,
                }
            
                postMovieData = await fetch('/api/favourites',{  
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(MovieData)
                }).then( result=>result.json());
            }   
    
            if( postMovieData.message ){
                setAlertMessage( { type: 'success', message: postMovieData.message } );
                setTimeout( function(){ setAlertMessage( {} ); }, 2000 );
            } else {
                setAlertMessage( { type: 'danger', message: postMovieData.message } );
                setTimeout( function(){ setAlertMessage( {} ); }, 2500 );
            }

        }else {
            setIsNotLoggedIn(true)
            setAlertMessage( { type: 'danger', message: "Please signin to add to your favourites or watchlist!" } );
            setTimeout( function(){ setAlertMessage( {} ); }, 2000 ); 
        }
    }

    return (
        <div class='container-fluid' >
            { isNotLoggedIn ? <Redirect to='/login' /> : '' }
            <div style={movieStyle.messageStyle} className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">
                {alertMessage.message}
            </div>

            <div class="container">
                <div class="row">
                    <div class='col-md-4 text-center' >
                        {movieDetails.poster_path && movieDetails.poster_path !=="null" ? <img style={{width: '100%'}} src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt="movie img" /> : <img style={{width: '100%'}} src='https://critics.io/img/movies/poster-placeholder.png' /> }
                    </div>
                    <div class='col-md-8'>
                        <h1>{movieDetails.title}</h1>
                        <h4 style={{color:"white", fontStyle: "italic"}}>"{movieDetails.tagline}"</h4>
                        <button class="btn btn-outline-danger mr-3 mt-3" onClick={() => getMovieId("favourites", movieDetails)}><i class="fas fa-heart"></i> Favourites</button>
                        <button class="btn btn-outline-primary mr-3 mt-3" onClick={() => getMovieId("watchlist", movieDetails)}><i class="fas fa-plus"></i>  Watch List</button>
                        <Link to={`/reviews/${movieDetails.id}/${movieDetails.title}`}>
                            <button type="button" className="btn btn-outline-info mt-3"><i class="fas fa-comments"></i> View Reviews</button>
                        </Link>
                        <div>
                            <ul class="list-group">
                                <li class="list-group-item" style={movieStyle.listGroupItem}> <i class="fas fa-1x fa-star" style={{color: "yellow"}}></i><b> {movieDetails.vote_average}</b>/10</li>
                                <li class="list-group-item" style={movieStyle.listGroupItem}><i class="fas fa-clock"></i> RunTime: {movieDetails.runtime} min</li>
                            </ul>
                        </div>
                        <div class="container" style={{color:"white"}}>
                            <h5>Overview</h5>
                            <p>{movieDetails.overview}</p>
                        </div>
                        <div class="container" style={{color:"white"}}>
                            <h5>Genre</h5>
                            {movieDetails && movieDetails.genres ? <p>{movieDetails.genres.map( genre =><span class="badge badge-primary mr-2" style={{padding: "10px"}}>{genre.name}</span>)} </p> : '[no genre list]' }
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mt-5">
                <h1>Full Cast & Crew</h1>
                <div class="row">
                    {movieDetails && movieDetails.genres ? 
                    <div class="row">{movieDetails.credits.cast.slice(0,10).map( actor =>
                        <div class="mt-3 mr-3 mx-auto">
                            {actor.profile_path ? <img style={movieStyle.castImage} src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt="movie img" />: <img style={movieStyle.castImage} src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png'  /> }
                            <p class="list-group-item" style={{color: "black", textAlign: "center"}}>{actor.name}</p>
                        </div> 
                    )} 
                    </div> : '[no cast members]' }
                </div>
            </div>
            <div class="container mt-5">
                <h1>Official Movie Trailers</h1>
                <div class="row ">                    
                {movieTrailer !== undefined ? movieTrailer.slice(0,3).map(movie => 
                    <div class="mr-4 mt-4">
                        <iframe width="340" height="215" src={`https://www.youtube.com/embed/${movie.key}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div> ): "Sorry Trailers cannot be Uploaded"}
                </div>
            </div>
            <div class="container mt-5">
                <h1>Related Movies</h1>
                <div class="row ">                    
                {similarMovies !== undefined ? similarMovies.slice(0,10).map(movie => 
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
                        <a class="btn myBtn mr-2" href={"/movieDetails/" + movie.id}> View Detail</a>
                        <button type="button" onClick={() => getMovieId("watchlist", movie)} class="btn  myBtn mr-2"><i class="fas fa-bookmark"></i></button>
                        <button type="button" onClick={() => getMovieId("favourites", movie)} class="btn myBtn mr-2"><i class="far fa-heart"></i></button>
                    </div>
                </div>
                ) : "Sorry! Related Movies Cannot be Shown!"}
                </div>
            </div>
        </div>       
    )
}

export default MovieInformation
