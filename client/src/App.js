import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from './components/HomePage/HomePage'
import SearchMovie from './components/SearchMoviePage/SearchForm'
import MovieInfo from './components/MoviePage/MovieInformation'
import MovieWatchList from './components/WatchList/MovieWatchList';
import LoginPage from './components/Login/LoginPage';
import LogoutPage from './components/Login/LogoutPage';
import Registration from './components/Registration/Registration';
import Profile from './components/UserProfile/Profile';
import Favourites from './components/FavouritePage/MovieFavourites';
import Footer from './components/Footer/Footer'
import './App.css';
import Friends from './components/FriendPage/Friend';
import GenrePage from './components/Genre/GenrePage';
import GenreMoviePage from './components/Genre/GenreMoviePage';
import FriendProfilePage from './components/FriendPage/FriendProfilePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container-fluid main">
        <Route exact path={["/","/homepage"]} component={HomePage} />
          <Route exact path="/searchMovie" component={SearchMovie} />
          <Route exact path="/movieDetails/:id" component={MovieInfo} />
          <Route exact path="/watchlist/:id" component={MovieWatchList} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          {/* delete before pushing */}
          <Route exact path="/user/:id" component={Profile} /> 
          <Route exact path="/favourites/:id" component={Favourites} />

          <Route exact path="/friendList" component={Friends} />
          
          <Route exact path="/genrePage" component={GenrePage} />
          <Route path="/genre/:id" component={GenreMoviePage} />
          <Route path="/friendProfile/:id" component={FriendProfilePage} />          
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;