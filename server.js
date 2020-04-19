require('dotenv').config(); // --> process.env
const express = require( 'express' );
const fs = require('fs');
const path = require("path");
const orm = require( './db/orm.mongoose' );

const PORT = process.env.PORT || 8080;
const app = express();

app.use( express.static('client/build/') );
app.use(express.static(path.join(__dirname, "client/src/components/Genre")));
app.use( express.urlencoded({ extended: false }) );
app.use( express.json() );

//Registration
app.post('/api/user/registration', async function( req,res ){
  const userData = req.body;
  const registerResult = await orm.registerUser( userData );
  res.send(registerResult);
})

//Login
app.post('/api/user/login', async function( req,res ){
  const userData = req.body;
  const loginResult = await orm.loginUser( userData.email, userData.password );
  loginResult.rememberMe = req.body.rememberMe;
  res.send( loginResult );
    
});

//Post to Watchlist
app.post("/api/watchlistMovie", async (req, res) => {
  const movieData = req.body;
  const movieResult = await orm.postWatchlist( movieData );
  res.send(movieResult );
})

//Get specific movie from watchlist
app.get("/api/watchlistMovie/:id", async (req, res) => {
  const id = req.params.id;
  const getMovieData = await orm.getWatchlist( id );
  res.json(getMovieData);
})

//Post to favourites
app.post("/api/favourites", async (req, res) => {
  const movieData = req.body;
  const movieResult = await orm.postFavourites( movieData );
  res.send(movieResult );
})

//Get from favourites
app.get("/api/favourites/:id", async (req, res) => {
  const id = req.params.id;
  const getMovieData = await orm.getFavourites( id );
  res.json(getMovieData);
})

//remove movie from favourites
app.delete("/api/removeFavMovie/:userId/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  const userId = req.params.userId;
  const deleteMovie = await orm.deleteFavMovie(userId,movieId);
  res.send(deleteMovie);
});

//remove movie from watchlist
app.delete("/api/removeListMovie/:userId/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  const userId = req.params.userId;
  const deleteMovieList = await orm.deleteWatchListMovie(userId,movieId);
  res.send(deleteMovieList);
});

//to load registered users
app.get("/api/UsersList", async (req, res) => {
  const usersData = await orm.getUserslist();
  res.json(usersData);
})

// to add or follow user
app.post("/api/saveFriend", async (req, res) => {
  const friendData = req.body;
  const friendResult = await orm.postFriend( friendData );
  res.send(friendResult );
})

//to load users friends list
app.get("/api/friendList/:id", async (req, res) => {
  const id = req.params.id;
  const friendsData = await orm.getFriendlist( id );
  res.json(friendsData);
})

// to delete friends from llist
app.get("/api/deleteFriend/:userId/:frndId", async (req, res) => {
  const objIds ={
    userId : req.params.userId,
    frndId : req.params.frndId
  }
  const friendsData = await orm.deleteFriend( objIds );
  res.json(friendsData);
})

//genre list
 app.get('/api/genre/list', async( req,res) => {
   const genres = JSON.parse( fs.readFileSync( "client/src/components/Genre/genre.json" ) );
   res.send( genres );
  });
  
  app.get("/api/avatar/:id", async (req, res) => {
    const id = req.params.id;
    const showProfile = await orm.showProfileDb( id );
  res.json(showProfile)
})

//JOANNA REVIEWS SECTION
app.post("/api/review", async (req, res) => {
  const postMovieReview = await orm.postReview(req.body);
  res.send(postMovieReview );
})

app.get("/api/specificReviews/:id", async (req, res) => {
  const getReviews = await orm.getSpecificMovieReviews(req.params.id);
  // console.log(`[getReviews server.js]`, getReviews)
  res.send(getReviews);
});

app.delete("/api/removeReview/:userId/:movieId", async (req, res) => {
  console.log("[delete review server.js]");
  const movieId = req.params.movieId;
  const userId = req.params.userId;
  const deleteReview = await orm.deleteReviewInfo(userId,movieId);
  res.send(deleteReview);
});


app.listen( PORT, function(){
  console.log( `[MovieManiax server] RUNNING, http://localhost:${PORT}` );
});