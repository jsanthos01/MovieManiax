import React, {useState, useContext, useEffect} from 'react'
import MovieList from './MovieList'
import { useParams } from 'react-router-dom';

function MovieWatchList() {
    const [myMovies, setMyMovies] = useState( [] );
    const { id } = useParams();

    const style = {
        header: {textAlign: "center", paddingBottom: "30px"}
    }
    async function getSavedMovieList(){
        const getMovies = await fetch(`/api/watchlistMovie/${id}`).then(res => res.json());
        const movies = getMovies;
        setMyMovies(movies[0].watchlist);
    }

    useEffect(function(){
        getSavedMovieList();
    },[])

    return (
        <div class="container-fluid" style={{color:"black"}}>
            <div class="header">
                <h1 style={style.header}>Your WatchList</h1>
            </div>

            <div className="result container mb-5">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <h3 class="col-11"><i class="fas fa-cloud-download-alt"></i>  Pinned Movies </h3>
                        </div>
                        <hr/>
                        { myMovies.length > 0 ? <MovieList myMovies={myMovies}getSavedMovieList={getSavedMovieList} />: 'You have not added to your watchlist' }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieWatchList
