import React, { useContext } from 'react'
import { useParams } from "react-router-dom";
import { UserContext } from '../FriendProfilePage';

function WatchList() {
    const {myMovies} = useContext(UserContext);
    // const [myMovies, setMyMovies] = useState( [] );

    // console.log('watchlist in line 7 of watch', watchlist[0])
    console.log('watchlist in line 10 of myMovies', myMovies)
    return (
        <div  style={{color : 'white'}}>
            {myMovies.map(movie=>
                <div>{movie.title}
                    <p>{movie.description}</p>
                </div>)}
        </div>
    )
}

export default WatchList;
