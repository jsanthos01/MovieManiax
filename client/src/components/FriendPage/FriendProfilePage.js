import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WatchList from "./comp/WatchList"
import FavouritesList from "./comp/Favouriteslist"
import TabBar from "./comp/TabBar"
export const UserContext = React.createContext();

function FriendProfilePage() {

    const { id } = useParams();
    console.log("frndId: ", id);
    const [friendProfile, setFriendProfile] = useState([]);
    // const [watchList, setWatchList] = useState([]);
    const [myMovies, setMyMovies] = useState( [] );
    const [myFavouritesMovies, setFavouritesMyMovies] = useState( [] );
    // const [myMovies, setMyMovies] = useState( [] );


    async function loadFriendProfile(){
        const getFriend = await fetch(`/api/friend/${id}`).then(result=>result.json());
        // const newfriend = apiFriend;
        console.log("22 inside the watchlist page:", getFriend)
        console.log("23 inside the watchlist page 2:", getFriend.watchlist)
        
        setMyMovies(getFriend.watchlist);
        setFavouritesMyMovies(getFriend.favourites);

        console.log( 'line 30 ', getFriend)
        // console.log( apiFriend[0].watchList )
        
        // console.log('new friend profile info received: ', apiFriend)
        setFriendProfile( getFriend );
        // setWatchList( apiFriend.watchList)
    }

    useEffect( function(){
        loadFriendProfile()  
    }, []);

    return (
    <div class="container-fluid">
        <div class="container mx-auto" style={{color : 'white'}}>
            <div class="d-flex justify-content-center">
                <div class="col-md-6  mx-auto">
                    <img src={friendProfile.profileImg} alt="img profile" style={{width : '60%'}}/>
                    <h1 class="text-center">{friendProfile.name}</h1>
                </div>

            </div>
        </div>
        <UserContext.Provider value ={{myMovies, myFavouritesMovies }}>
            <Router>
                <TabBar id={id}/>
                <Route exact path="/friendProfile/:id/WatchList" component={WatchList} />
                <Route exact path="/friendProfile/:id/FavoritesList" component={FavouritesList} />
            </Router>
        </UserContext.Provider>
    </div>
    )
}

export default FriendProfilePage
