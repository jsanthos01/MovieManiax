import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WatchList from "./comp/WatchList"
import FavouritesList from "./comp/Favouriteslist"
import AboutPage from "./comp/About"
import FollowerList from "./comp/FollowerList"
import Reviews from "./comp/Reviews"
import TabBar from "./comp/TabBar"
// import MovieInfo from './components/MoviePage/MovieInformation'
import MovieInfo from '../MoviePage/MovieInformation'

export const UserContext = React.createContext();

function FriendProfilePage() {

    const { id } = useParams();
    console.log("frndId: ", id);
    const [friendProfile, setFriendProfile] = useState([]);
    const [myMovies, setMyMovies] = useState( [] );
    const [myFavouritesMovies, setFavouritesMyMovies] = useState( [] );
    const [myFriendList, setMyFriendList] = useState( [] );
    const [myReview, setMyReview] = useState( [] );


    async function loadFriendProfile(){
        const getFriend = await fetch(`/api/friend/${id}`).then(result=>result.json());
        // const newfriend = apiFriend;
        console.log("22 inside the watchlist page:", getFriend)
        console.log("23 inside the friendList page 2:", getFriend.friendList)
        
        setMyMovies(getFriend.watchlist);
        setFavouritesMyMovies(getFriend.favourites);
        setMyFriendList(getFriend.friendList);
        setMyReview(getFriend.myReviews);

        console.log( 'line 30 ', getFriend)
        
        setFriendProfile( getFriend );
    }

    useEffect( function(){
        loadFriendProfile()  
    }, []);

    return (
    <div class="container-fluid">
        <div class="container mx-auto" style={{color : 'white'}}>
            <div class="d-flex justify-content-center">
                <div class="col-md-2  mx-auto">
                    <img src={friendProfile.profileImg} alt="img profile" style={{width : '100%'}}/>
                </div>
                <div class="col-md-10  mx-auto">
                    <h1 class="text-center">{friendProfile.name}</h1>
                    <UserContext.Provider value ={{myMovies, myFavouritesMovies, friendProfile, myFriendList, myReview}}>
                        <Router>
                            <TabBar id={id}/>
                            <Route exact path={["/friendProfile/:id","/friendProfile/:id/About"]} component={AboutPage} />
                            <Route exact path="/friendProfile/:id/WatchList" component={WatchList} />
                            <Route exact path="/friendProfile/:id/FavoritesList" component={FavouritesList} />
                            <Route exact path="/friendProfile/:id/FollowerList" component={FollowerList} />
                            <Route exact path="/friendProfile/:id/Reviews" component={Reviews} />
                            <Route exact path="/movieDetails/:id" component={MovieInfo} />

                        </Router>
                    </UserContext.Provider>
                    
                </div>

            </div>
        </div>
    </div>
    )
}

export default FriendProfilePage
