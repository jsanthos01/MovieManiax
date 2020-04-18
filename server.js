require('dotenv').config(); // --> process.env
const express = require( 'express' );
const fs = require('fs');
const orm = require( './db/orm.mongoose' );

const PORT = process.env.PORT || 8080;

const app = express();
// const upload = require('multer')({ dest: 'public/uploads/' });
// PORT is only set by Heroku, else we know it's local
const path = require("path");

app.use( express.static('client/build/') );
app.use(express.static(path.join(__dirname, "client/src/components/Genre")));

app.use( express.urlencoded({ extended: false }) );
app.use( express.json() );

app.post('/api/user/registration', async function( req,res ){
    const userData = req.body;
    // console.log( `[Server.js POST: /api/user/registration] userData: `, userData );    
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

app.post("/api/watchlistMovie", async (req, res) => {
    const movieData = req.body;
    // console.log(movieData);
    const movieResult = await orm.postWatchlist( movieData );
    res.send(movieResult );
})

app.get("/api/watchlistMovie/:id", async (req, res) => {
  // console.log(req.params.id)
  const id = req.params.id;
  const getMovieData = await orm.getWatchlist( id );
  res.json(getMovieData);
})

app.post("/api/favourites", async (req, res) => {
  // console.log("inside the favourites server.js")
    const movieData = req.body;
    // console.log(movieData);
    const movieResult = await orm.postFavourites( movieData );
    res.send(movieResult );
})

app.get("/api/favourites/:id", async (req, res) => {
  // console.log(req.params.id)
  const id = req.params.id;
  const getMovieData = await orm.getFavourites( id );
  // const getMovieData = await orm.getWatchlist( id );
  res.json(getMovieData);
})

app.delete("/api/removeFavMovie/:userId/:movieId", async (req, res) => {
  console.log("[delete route]", req.params.movieId);
  const movieId = req.params.movieId;
  const userId = req.params.userId;
  const deleteMovie = await orm.deleteFavMovie(userId,movieId);
  res.send(deleteMovie);
});

app.delete("/api/removeListMovie/:userId/:movieId", async (req, res) => {
  console.log("[delete route]", req.params.movieId);
  const movieId = req.params.movieId;
  const userId = req.params.userId;
  const deleteMovieList = await orm.deleteWatchListMovie(userId,movieId);
  res.send(deleteMovieList);
});

//to load registered users
app.get("/api/UsersList", async (req, res) => {
  console.log('in server file getting friends: ',req.params)
  // const id = req.params;
  const usersData = await orm.getUserslist( );
  res.json(usersData);
})

// to add or follow user
app.post("/api/saveFriend", async (req, res) => {
  const friendData = req.body;
  console.log('in server file, the friend data info received is: ',friendData);
  const friendResult = await orm.postFriend( friendData );
  res.send(friendResult );
})

//to load users friends list

app.get("/api/friendList/:id", async (req, res) => {
  console.log('in server file getting friends: ',req.params)
  const id = req.params.id;
  const friendsData = await orm.getFriendlist( id );
  res.json(friendsData);
})

// to delete friends from llist
app.get("/api/deleteFriend/:userId/:frndId", async (req, res) => {
  console.log('in server file deleting friends: ',req.params)
  const objIds ={
    userId : req.params.userId,
    frndId : req.params.frndId
  }
  const friendsData = await orm.deleteFriend( objIds );
  res.json(friendsData);
})

 /// genre list
 app.get('/api/genre/list', async function( req,res ){
  const genres = JSON.parse( fs.readFileSync( "client/src/components/Genre/genre.json" ) );
  res.send( genres );
});

app.get("/api/avatar/:id", async function(req, res){
  const id = req.params.id;
  const showProfile = await orm.showProfileDb( id );
  res.json(showProfile)
})

//JOANNA REVIEWS SECTION
app.post("/api/review", async function(req, res){
  const postMovieReview = await orm.postReview(req.body);
  res.send(postMovieReview );
})

app.listen( PORT, function(){
    console.log( `[MovieManiax server] RUNNING, http://localhost:${PORT}` );
 });