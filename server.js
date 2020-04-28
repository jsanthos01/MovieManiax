require('dotenv').config(); // --> process.env
const express = require( 'express' );
const fs = require('fs');
const path = require("path");
const orm = require( './db/orm.mongoose' );
const multer  = require('multer');
const PORT = process.env.PORT || 8080;
const app = express();
var server = app.listen( PORT, function(){ console.log( `[Movie Maniax], http://localhost:${PORT}` ); });
const io = require('socket.io')(server);
//getting all the functions that are initialized inside users.js
const {addUser, removeUser, getUser, getUserInRoom} = require("./chatUsers");

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
  const deleteMovie = await orm.deleteFavMovie(userId, movieId);
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
//to load friends profile

app.get("/api/friend/:id", async (req, res) => {
  // console.log('in server file getting friend profile: ',req.params)
  const id = req.params.id;
  const friendsProfile = await orm.getFriendInfo( id );
  res.json(friendsProfile);
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
//--------------friends activity page


app.post("/api/activityList", async (req, res) => {
  // console.log('in server the friend ids: ',req.body)
  const activityData = await orm.getActivitylist(req.body);
  res.json(activityData);
})
app.post("/api/postCommentActivity", async (req, res) => {
  // console.log('in server the friend ids: ',req.body)
  const activityData = await orm.postCommentActivity(req.body);
  res.json(activityData);
})
app.post("/api/likeCommentActivity", async (req, res) => {
  // console.log('in server the friend ids: ',req.body)
  const activityData = await orm.postLikeActivity(req.body);
  res.json(activityData);
})
//----------------------------------------------------------
//JOANNA REVIEWS SECTION
app.post("/api/review", async (req, res) => {
  // console.log("REVIEW IMAGE SECTION", req.body);
  const postMovieReview = await orm.postReview(req.body);
  res.send(postMovieReview );
})

app.get("/api/specificReviews/:id", async (req, res) => {
  const getReviews = await orm.getSpecificMovieReviews(req.params.id);
  res.send(getReviews);
});

app.put("/api/removeReview/:userId/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  const userId = req.params.userId;
  const comment = req.body;
  const deleteReview = await orm.deleteReviewInfo(userId, movieId, comment);
  res.send(deleteReview);
});


const upload = require('multer')({ dest: 'client/public/uploads/' });
app.put( '/api/upload/:userid', upload.single('myFile'), async function( req, res ){
  let userId = req.params.userid
  const filePath = req.file.path;
  const originalName = req.file.originalname;
 
  const fileExt = originalName.toLowerCase().substr((originalName.lastIndexOf('.'))).replace('jpeg','jpg');
    fs.renameSync( `${__dirname}/${filePath}`, `${__dirname}/${filePath}${fileExt}` );
  const imageUrl = req.file.path.replace(/\\/g, '/').replace('client/public/','/')+fileExt;
  const imgUploadDb = await orm.updateAvatar( userId, imageUrl );
  res.send( imgUploadDb );

});

app.put('/api/user/:id', async function( req, res ){
  const bioData = req.body;
  const id = req.params.id;
  const bioResult = await orm.bioResultDb( id, bioData );
  res.send( bioResult );
});

app.get("/api/userImage/:id" , async function (req, res) {
  const getProfilePic = await orm.profilePic( req.params.id );
  res.send(getProfilePic)
});

app.post("/api/reviewComment", async (req, res) => {
  const postReviewComment = await orm.postComment(req.body);
  res.send(postReviewComment)
});

app.post("/api/thumbsUp", async (req, res) => {
  const postThumbsUp = await orm.thumbsUp(req.body);
  res.send(postThumbsUp)
});

app.get("/api/notifications", async (req, res) => {
  const getNotifications = await orm.getNotifications();
  res.send(getNotifications)
});

app.post("/api/groupData", async (req, res) => {
  const postGroupData = await orm.postGroupInfo(req.body);
  res.send(postGroupData)
});

app.get("/api/groupData/:id", async (req, res) => {
  const getGroupsInfo = await orm.getGroups(req.params.id);
  res.send(getGroupsInfo)
});


// SOCKET.IO

//Here, we set up socket.io. This function listens for a connection event. Once it hears the connection event, it runs the io.on function
io.on('connection', (socket) => {  
  //When user joins (specific event)
  //The callback is useful to trigger a response immediately after socket.on event is emitted
  socket.on("join", ({name, room}, callback)=> {
      console.log(`Name of User: ${name} and Room: ${room}`);
     
      // 1. Here, we are calling addUser function from users.js
      // 2. If this function successfully works, it returns the user's info else it returns an error
      // UNSURE 3. socket.id = basically is the id of a specific instance of a socket
      const {error, user} = addUser({id:socket.id, name, room});
      if(error) return callback(error);

      // 4. joins a user to a room
      socket.join(user.room);

      //ADMIN GENERATED MESSAGE : Now that the user has entered a specific room, we can send a message to the user on the client-side
      socket.emit('message', {user: 'admin', text: `${user.name}, Welcome to the room ${user.room}`})
      
      //socket.broadcast sends a message to everyone except the user
      // in this case, we notify everyone in the chat that a new user has joined
      socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has joined`})
     
      //if there are no errors, simply run callback so that the if statement in client side runs 
      
      //5. to get all the users inside a specific room
      // io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)})
      callback();
  }) 

  //USER GENERATED MESSAGE
  socket.on("sendMessage", (message, callback) => {
      //1. get the id of the user who sent the message
      console.log("line 46",message);
      console.log(socket.id)
      const user = getUser(socket.id);
      console.log("line 46", user)
      //2. io.to().emit()  will send the message to all everyone connected to the room including the user himself who wrote it
      io.to(user.room).emit("message", {user: user.name, text: message})
      // io.to(user.room).emit("message", {room: user.room, users: getUserInRoom(user.room)})
      callback();
  })
  //When user disconnects, 
  socket.on('disconnect', () => {
      console.log("User has Left");
      // 1. If user left, call removeUser function
      const user = removeUser(socket.id);
      // 2. send a message to the other users in the room 
      if(user){
          io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left the chat.`});
      }

  })
});

// app.listen( PORT, function(){
//   console.log( `[MovieManiax server] RUNNING, http://localhost:${PORT}` );
// });