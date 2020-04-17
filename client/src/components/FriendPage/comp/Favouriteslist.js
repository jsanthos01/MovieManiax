import React, { useContext }  from 'react'
import { UserContext } from '../FriendProfilePage';

function Favouriteslist() {
    const {myFavouritesMovies} = useContext(UserContext);
    return (
        <div  style={{color : 'white'}}>
            {myFavouritesMovies.map(movie=>
                <div>{movie.title}
                    
                </div>)}

        </div>
    )
}

export default Favouriteslist
