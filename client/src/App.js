import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import WatchList from "./components/WatchList/MovieWatchList";
import Login from "./components/Login/Login";
import Footer from "./components/Footer";
import Registration from './components/Registration/Registration';
import './App.css';
import LogoutPage from './components/Login/LogoutPage';



function App() {
  return (
    <Router>
     <div className="App">
      <NavBar/>

        <Route exact path={["/","/homepage"]} component={HomePage} />
        <Route exact path={"/watchlist"} component={WatchList} />
        <Route exact path="/login" component={Login} />
        {/* <Registration /> */}
        <LogoutPage />

      <Footer />
     </div>
    </Router>
  )}