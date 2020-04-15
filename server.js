require('dotenv').config(); // --> process.env
const express = require( 'express' );
const fs = require('fs');
const orm = require( './db/orm.mongoose' );

const PORT = process.env.PORT || 8080;

const app = express();
// const upload = require('multer')({ dest: 'public/uploads/' });
// PORT is only set by Heroku, else we know it's local

app.use( express.static('client/build/') );
app.use( express.urlencoded({ extended: false }) );
app.use( express.json() );

app.post('/api/user/registration', async function( req,res ){
    const userData = req.body;
    console.log( `[Server.js POST: /api/user/registration] userData: `, userData );    
    const registerResult = await orm.registerUser( userData );
    // console.log("[POST RESULT] registration:", registerResult);
    res.send(registerResult);
})

app.post('/api/user/login', async function( req,res ){
    const userData = req.body;
    // console.log( `[POST: /api/user/login] userData: `, userData );
    const loginResult = await orm.loginUser( userData.email, userData.password );
    loginResult.rememberMe = req.body.rememberMe;
    res.send( loginResult );
    
});


// JOANNA'S CODE WATCHLIST & FAVOURITES
app.post("/api/watchlistMovie", async (req, res) => {
    const movieData = req.body;
    console.log(movieData);
    const movieResult = await orm.postWatchlist( movieData );
    res.send(movieResult );
})

app.get("/api/watchlistMovie/:id", async (req, res) => {
  console.log(req.params.id)
  const id = req.params.id;
  const getMovieData = await await orm.getWatchlist( id );
  res.json(getMovieData);
})
app.post("/api/favourites", async (req, res) => {
  console.log("inside the favourites server.js")
    const movieData = req.body;
    console.log(movieData);
    const movieResult = await orm.postFavourites( movieData );
    res.send(movieResult );
})

app.get("/api/favourites/:id", async (req, res) => {
  console.log(req.params.id)
  const id = req.params.id;
  const getMovieData = await await orm.getFavourites( id );
  res.json(getMovieData);
})

app.delete("/api/removeFavMovie/:userId/:movieId", async (req, res) => {
  console.log("[delete route]", req.params.movieId);
  const movieId = req.params.movieId;
  const userId = req.params.userId;
  const deleteMovie = orm.deleteFavMovie(userId,movieId);
  res.send(deleteMovie);
});
app.delete("/api/removeListMovie/:userId/:movieId", async (req, res) => {
  console.log("[delete route]", req.params.movieId);
  const movieId = req.params.movieId;
  const userId = req.params.userId;
  const deleteMovieList = orm.deleteWatchListMovie(userId,movieId);
  res.send(deleteMovieList);
});
// JOANNA'S CODE WATCHLIST & FAVOURITES ENDING LINE------

app.listen( PORT, function(){
    console.log( `[everest server] RUNNING, http://localhost:${PORT}` );
 });