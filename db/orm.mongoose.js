const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );

// mongoose.connect(`mongodb://${process.env.movieTracker}`,{useNewUrlParser: true});

mongoose.connect(`mongodb://localhost:27017/movieTracker`, {useNewUrlParser: true});
const db = require( './models' );


// input: <object> { name, email, password }
// output: { message, id, name }
async function registerUser( userData ){
    if( !userData.password || !userData.name || !userData.email ){
        console.log( `[registerUser] invalid userData! `, userData );
        return { message: "Invalid user data", id: "", name: "" };
    }
    
    console.log( `[registerUser], userData: `, userData );
    const saltRounds = 10;
 
    const passwordHash = await bcrypt.hash(userData.password, saltRounds);
    console.log( `[registerUser] (hash=${passwordHash}) req.body:`, userData );
    
    const saveData = {
       name: userData.name,
       email: userData.email,
       password: passwordHash
    };

    const dbUser = new db.users( saveData );
    const saveUser = await dbUser.save();
    return { 
        message: "User successfully saved", 
        id: saveUser._id,
        email: saveUser.email,
        name: saveUser.name 
    };           
 }

// input: email, password
// output: <object> { userId, firstName, lastName, emailAddress, creationTime } || false
async function loginUser( email, password ) {
    const userData = await db.users.findOne({ email: email });
    console.log( `[loadUser] email='${email}' userData:`, userData );
    if( !userData ) {
        return { error: "Invalid password" };
    }

    const isValidPassword = await bcrypt.compare( password, userData.password );
    // console.log( ` [loginUser] checking password (password: ${password} ) hash(${userData.password})`, isValidPassword );
    if( !isValidPassword ) {
        return { error: "Invalid password" };
    }

    // // create a new session for this user and save it.
    // userData.session = uuid.v4();

    // // update the session
    // // remove entries before we do teh update
    // delete userData.createdAt;
    // delete userData.updatedAt;
    // const dbResult = await db.users.findOneAndUpdate( 
    //    { _id: userData._id}, 
    //    userData );

    // remap the data into the specified fields as we are using camelCase
    return {
        message: "user successfully loggedin",
        id: userData._id,
        name: userData.name,
        email: userData.email,
    };
}


//WatchList Section
async function postWatchlist(movieData){
    console.log("Inside orm file")
    console.log(movieData);
 
    const movieInfo = {
       "movieId": `${movieData.movieId}`,
       "title": `${movieData.title}`,
       "image":`${movieData.image}`,
       "description": `${movieData.description}`,
       "popularity": `${movieData.popularity}`,
       "releaseDate": `${movieData.releaseDate}`,
       "ratings": `${movieData.ratings}`
    }
 
    const userFetch = await db.users.findOneAndUpdate({ _id: movieData.userId }, { $push: { watchlist:  movieInfo } });
    console.log(userFetch)
    return { message: "Movie successfully saved in Watchlist!!"};
}


async function getWatchlist(id){
    const getSavedList =  db.users.find({_id:id});
    return getSavedList;
}

//Favourites Section
async function postFavourites(movieData){
    console.log("Inside orm post favourites file")
    console.log(movieData);
 
    const movieInfo = {
       "movieId": `${movieData.movieId}`,
       "title": `${movieData.title}`,
       "image":`${movieData.image}`,
       "ratings": `${movieData.ratings}`
    }
    //creating a new modal object
    const userFetch = await db.users.findOneAndUpdate({ _id: movieData.userId }, { $push: { favourites:  movieInfo } });
    console.log(userFetch)
    return { message: "Movie successfully saved in Favourites!!"};
 }
 
async function getFavourites(id){
    const getSavedList =  db.users.find({_id:id});
    return getSavedList;
}
 
module.exports = {
    registerUser,
    loginUser,
    postWatchlist,
    getWatchlist,
    postFavourites,
    getFavourites
}