import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import WatchList from "./components/WatchList/MovieWatchList";
import Login from "./components/Login/Login";
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
     <div className="App">
      <NavBar/>

        <Route exact path={["/","/homepage"]} component={HomePage} />
        <Route exact path={"/watchlist"} component={WatchList} />
        <Route exact path="/login" component={Login} />

      <Footer />
     </div>
    </Router>
  );
}

export default App;