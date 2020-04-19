const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );

// mongoose.connect(`mongodb://${process.env.movieTracker}`,{useNewUrlParser: true});

mongoose.connect(`mongodb://localhost:27017/movieTracker`, {useNewUrlParser: true, useFindAndModify: false});
const db = require( './models' );

async function registerUser( userData ){
    if( !userData.password || !userData.name || !userData.email ){
        return { message: "Invalid user data", id: "", name: "" };
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(userData.password, saltRounds);    
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


async function loginUser( email, password ) {
    const userData = await db.users.findOne({ email: email });
    if( !userData ) {
        return { error: "Couldn't find that email. Register or try again!" };
    }

    const isValidPassword = await bcrypt.compare( password, userData.password );
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
    console.log("Inside orm file");     
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
    return { message: "Movie successfully saved in Watchlist!!"};
}


async function getWatchlist(id){
    const getSavedList = await db.users.find({_id:id});
    return getSavedList;
}

//Favourites Section
async function postFavourites(movieData){
    const movieInfo = {
        "movieId": `${movieData.movieId}`,
        "title": `${movieData.title}`,
        "image":`${movieData.image}`,
        "ratings": `${movieData.ratings}`
    }
    const userFetch = await db.users.findOneAndUpdate({ _id: movieData.userId }, { $push: { favourites:  movieInfo } });
    return { message: "Movie successfully saved in Favourites!!"}; 
}
 
async function getFavourites(id){
    const getSavedList = await db.users.find({_id:id});
    return getSavedList;
}
 
async function deleteFavMovie(userId, movieObjId){
    const deleteMovieDb = await db.users.updateOne({_id: userId},{ "$pull": { "favourites": { _id: movieObjId }}}, {safe: true, multi: true},function(err, obj){
        console.log(err)
    });
    return { message: "Movie successfully deleted from favourites page!!"};
}
async function deleteWatchListMovie(userId, movieObjId){
    const deletemovie = await db.users.updateOne({_id: userId},{ "$pull": { "watchlist": { _id: movieObjId }}}, {safe: true, multi: true},function(err, obj){
        console.log(err)
    });
    return { message: "Movie successfully deleted from watchlist page!!"};
}

async function getUserslist(){
    const getUserList = await db.users.find({});
    return getUserList;
}

async function postFriend(friendData){
    const myId= friendData.userId;
    const friendInfo = {
        'userId': `${friendData.userId}`,
        'name': `${friendData.friendName}`,
    }

    const userFetch = await db.users.findOneAndUpdate({ _id: friendData.userId }, { $push: { friendList:  friendInfo } });
    return { message: "friend successfully saved in Watchlist!!"};
}

async function getFriendlist(id){
    const getFriendList = await db.users.find({_id:id});
    return getFriendList;
}

async function deleteFriend( objIds ){
    const DeleteFriendList = await db.users.update({ _id:  objIds.userId }, { "$pull": { "friendList": { "_id": objIds.frndId } }}, { safe: true, multi:true }, function(err, obj) {
        console.log(err)
    });
    return DeleteFriendList;
}

async function showProfileDb(id){
    const profileDb = await db.users.findById({ _id:id })
    return profileDb;
}

async function postReview(details){
    const myReview = {
        'movieId': `${details.movieId}`,
        'rating': `${details.rating}`,
        'comment': `${details.comment}`
    }
    const userFetch = await db.users.findOneAndUpdate({ _id: details.id }, { $push: { myReviews:  myReview } });
    
    const reviewSchema = {
        movieId: details.movieId,
        rating: details.rating,
        user: { 
            name:details.name,
            id: details.id
        },   
        comment: details.comment,
    }
    const dbReviews = new db.reviews( reviewSchema);
    const reviewInfo = await dbReviews.save();
    return { message: "Review successfully saved !!"};

}

async function getSpecificMovieReviews(id){   
    const getReviewData = await db.reviews.find({movieId: id});
    return getReviewData;
}

async function deleteReviewInfo( userId, movieId ){
    const deleteReview = db.reviews.deleteOne( { "_id" : movieId}, function (err) {
        if (err) return handleError(err)
    });
    const deleteUserReview = await db.users.update({ _id:  userId }, { "$pull": { "myReviews": { "_id": movieId } }}, { safe: true, multi:true }, function(err, obj) {
        console.log(err)
    });
    return { message: "Your Review has been deleted !!"};
}


//-----------------multer--------------------------------
async function updateAvatar( userId, imageUrl ){
    // console.log(`[updateThumbnail] thumbId(${imageId}) myEdit: `, myData);
    const imageData = {
        profileImg: imageUrl
     };
    const dbResult = await db.users.findOneAndUpdate({_id: userId}, imageData);
    return { message: `Thank you, updated` }
}
//--------------------------bio----------------------------

async function bioResultDb( bioId, bioData ){
    // console.log(`[updateBio] BioId(${bioId}) myEdit: `, bioData);
    const dbBioResult = await db.users.findOneAndUpdate({_id: bioId}, bioData);
    return dbBioResult;
}    

//------------------------------------------------------------ 

module.exports = {
    registerUser,
    loginUser,
    postWatchlist,
    getWatchlist,
    postFavourites,
    getFavourites,
    deleteFavMovie,
    deleteWatchListMovie,
    getUserslist,
    postFriend,
    getFriendlist,
    deleteFriend,
    showProfileDb,
    postReview,
    getSpecificMovieReviews,
    deleteReviewInfo,
    bioResultDb,
    updateAvatar
}