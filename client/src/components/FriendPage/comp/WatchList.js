import React, { useContext } from 'react'
import { useParams } from "react-router-dom";
import { UserContext } from '../FriendProfilePage';
import { Link } from "react-router-dom";

function WatchList() {
    const {myMovies} = useContext(UserContext);
    // const [myMovies, setMyMovies] = useState( [] );

    // console.log('watchlist in line 7 of watch', watchlist[0])
    console.log('watchlist in line 10 of myMovies', myMovies)
    return (
        <div class='tabHeight' style={{color : 'white'}}>
            <div class=' '>
            {myMovies.map(movie=>
                    <div class="movieCard mx-auto row " >
                        
                        {/* <div class="mvHrzCrdImg">
                        </div> */}
                        <div class="mvHrzCrdDesc col-md-2">
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.image}`} class="hrCdImg " alt="movie poster" />
                        </div>
                        <div class="mvHrzCrdDesc col-md-10">
                            <p class="movieCrdTitle">{movie.title}</p>  
                            <p>overview: {movie.description}/10</p>
                            <p class="ratngCard"> {movie.ratings}</p>
                            <Link to={"/movieDetails/" + movie.movieId }>
                                <button type="button" class="btn btn-outline-primary mr-2">View More</button>
                            </Link>
                        </div>
                    </div>
                )}
                </div>
        </div>
    )
}

export default WatchList;
