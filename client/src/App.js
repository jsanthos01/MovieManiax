import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchMovie from './components/SearchMoviePage/SearchForm'
import MovieInfo from './components/MoviePage/MovieInformation'
// import MovieWatchList from './components/WatchListPage/MovieWatchList';
import LoginPage from './components/Login/LoginPage';
import LogoutPage from './components/Login/LogoutPage';
import Registration from './components/Registration/Registration';
import Profile from './components/UserProfile/Profile';
import Favourites from './components/FavouritePage/MovieFavourites';
import Footer from './components/Footer/Footer'
import './App.css';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="container">
          {/* <Route exact path={["/","home"]} component={Homepage} /> */}
          <Route exact path="/searchMovie" component={SearchMovie} />
          <Route exact path="/movieDetails/:id" component={MovieInfo} />
          {/* <Route exact path="/watchlist/:id" component={MovieWatchList} /> */}
          <Route exact path="/register" component={Registration} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          {/* delete before pushing */}
          <Route exact path="/user/:id" component={Profile} /> 
          <Route exact path="/favourites/:id" component={Favourites} />
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;