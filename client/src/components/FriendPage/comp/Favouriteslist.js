import React, { useContext }  from 'react'
import { UserContext } from '../FriendProfilePage';

function Favouriteslist() {
    const {myFavouritesMovies} = useContext(UserContext);
    return (
        <div  class='tabHeight row'  style={{color : 'white'}}>
            {myFavouritesMovies.map(movie=>
            <div class="movieCard mx-auto" style={{width: "50vh"}}>
                <p class="movieCard-title">MOVIE DETAIL</p>  
                <div class="movieCrdImg">
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.image}`} class="crdImg" alt="movie poster" style={{width: "100%"}}/>
                </div>
                <div class="movieCrdDesc">
                    <p class="movieCrdTitle">{movie.title}</p>  
                    <p class="ratngCard">{movie.ratings}</p>
                </div>
            </div>
                )
                
                }

        </div>
    )
}

export default Favouriteslist
