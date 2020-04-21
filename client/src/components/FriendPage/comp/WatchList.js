import React, { useContext } from 'react'
import { UserContext } from '../FriendProfilePage';

function WatchList() {
    const {myMovies} = useContext(UserContext);
    // const [myMovies, setMyMovies] = useState( [] );

    // console.log('watchlist in line 7 of watch', watchlist[0])
    console.log('watchlist in line 10 of myMovies', myMovies)
    return (
        <div class='tabHeight' style={{color : 'white'}}>
            <div class=' '>
            {myMovies.map(movie=>
                    <div class="movieHrzCard mx-auto row " >
                        
                        {/* <div class="mvHrzCrdImg">
                        </div> */}
                        <div class="mvHrzCrdDesc col-md-2">
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.image}`} class="hrCdImg " alt="movie poster" />
                        </div>
                        <div class="mvHrzCrdDesc col-md-10">
                            <p class="movieCrdTitle">{movie.title}</p>  
                            <p>overview: {movie.description}/10</p>
                            <p class="ratngCard"> {movie.ratings}</p>
                            <a class="btn btn-success mr-2" href={"/movieDetails/" + movie.movieId}> View Detail</a>
                        </div>
                    </div>
                )}
                </div>
        </div>
    )
}

export default WatchList;
