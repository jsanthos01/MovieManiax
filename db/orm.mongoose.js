const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );
mongoose.connect(`mongodb+srv://${process.env.ATLAS_URI}`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
// mongoose.connect(`mongodb://${process.env.movieTracker}`,{useNewUrlParser: true});

// mongoose.connect(`mongodb://localhost:27017/movieTracker`, {useNewUrlParser: true, useFindAndModify: false});
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
    const movieInfo = {
       "movieId": `${movieData.movieId}`,
       "title": `${movieData.title}`,
       "image":`${movieData.image}`,
       "description": `${movieData.description}`,
       "popularity": `${movieData.popularity}`,
       "releaseDate": `${movieData.releaseDate}`,
       "ratings": `${movieData.ratings}`
    }

    const activityData = {
        "userId": `${movieData.userId}`, 
        "userName": `${movieData.userName}`, 
        "activityType": `watchList`, 
        "activity": `added ${movieData.title} to watchlist`,
        "movie":{
            "movieName": `${movieData.title}`,
            "movieId": `${movieData.movieId}`,
            "movieImg":`${movieData.image}`
        }
    }
 
    const checkWatchlist = await db.users.findOne({ _id: movieData.userId});
    let watchListArr = checkWatchlist.watchlist;
    const exists = watchListArr.find(movie => movie.movieId === movieInfo.movieId)
    if( exists) {
        return { message: "Movie Exists in the your watchlist page!!!" };
    }else{
        const dbActivity = new db.activities( activityData );
        const saveActivity = await dbActivity.save();
        const userFetch = await db.users.findOneAndUpdate({ _id: movieData.userId }, { $push: { watchlist:  movieInfo } });
        return { message: "Movie successfully saved in Watchlist!!"};
    }
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

    const activityData = {
        "userId": `${movieData.userId}`, 
        "userName": `${movieData.userName}`,
        "activityType": `favouritesList`, 
        "activity": `added ${movieData.title} to favourites List`,
        "movie":{
            "movieName": `${movieData.title}`,
            "movieId": `${movieData.movieId}`,
            "movieImg":`${movieData.image}`
        }
    }
    const checkFavourites = await db.users.findOne({ _id: movieData.userId});
    let favArr = checkFavourites.favourites;
    
    const exists = favArr.find(movie => movie.movieId === movieInfo.movieId)
    if( exists ) {
        return { message: "Movie Exists in the your Favourites page!!!" };
    }else {

        const dbActivity = new db.activities( activityData );
        const saveActivity = await dbActivity.save();

        const userFetch = await db.users.findOneAndUpdate({ _id: movieData.userId }, { $push: { favourites:  movieInfo } });
        return { message: "Movie successfully saved in Favourites!!"}; 
    }
}
 
async function getFavourites(id){
    const getSavedList = await db.users.find({_id:id});
    return getSavedList;
}
 
async function deleteFavMovie(userId, movieObjId){
    const deleteMovieDb = await db.users.updateOne({_id: userId},
        { "$pull": 
            { "favourites": { _id: movieObjId }}
        }, {safe: true, multi: true},function(err, obj){
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
        'friendId': `${friendData.friendId}`,
        'name': `${friendData.friendName}`,
        'image': `${friendData.friendImg}`,
    }
    const activityData = {
        "userId": `${friendData.userId}`, 
        "userName": `${friendData.userName}`,
        "activityType": `friendList`, 
        "activity": `added ${friendData.friendName} to Followers List`,
        "friend":{
            "friendName": `${friendData.friendName}`,
            "friendId": `${friendData.friendId}`,
            "friendImg":`${friendData.friendImg}`
        }
    }
    const dbActivity = new db.activities( activityData );
    const saveActivity = await dbActivity.save();

    const userFetch = await db.users.findOneAndUpdate({ _id: friendData.userId }, { $push: { friendList:  friendInfo } });
    return { message: "friend successfully saved in Watchlist!!"};
}
//activity list: 
async function getActivitylist(ids){
    const getActivityList = await db.activities.find({});
    const frndActvtArr= [];
    getActivityList.forEach(activity=>{
        for (var i=0; i<ids.length; i++){
            if(activity.userId == ids[i]){
                frndActvtArr.push(activity)
            }
        } })
    return frndActvtArr;
}
async function getFriendlist(id){
    const getFriendList = await db.users.find({_id:id});
    return getFriendList;
}
async function getFriendInfo(id){
    const getFriendInfo =  await db.users.find({_id:id});
    return getFriendInfo[0];
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
    //Save is User Schema
    const myReview = {
        'movieId': `${details.movieId}`,
        'movieImage':`${details.moviePoster}`,
        'movieName': `${details.movieName}`,
        'rating': `${details.rating}`,
        'comment': `${details.comment}`
    }

    const activityData = {
        "userId": `${details.id}`, 
        "userName": `${details.name}`,
        "activityType": `reviewList`, 
        "activity": `reviewed ${details.movieName}`,
        "review":{
            "comment": `${details.comment}`,
            "rating": `${details.rating}`,
        },
        "movie": {
            "movieName": `${details.movieName}`,
            "movieId": `${details.movieId}`,
            "movieImg":`${details.moviePoster}`
        },
    }
    const dbActivity = new db.activities( activityData );
    const saveActivity = await dbActivity.save();

    const userFetch = await db.users.findOneAndUpdate({ _id: details.id }, { $push: { myReviews:  myReview } });
    
    //Save is Review Schema
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


    //Save is Notification Schema
    const notification = {
        userName: details.name,
        reviewId: reviewInfo._id
    }
    const dbNotify = new db.notifications( notification);
    const saveNotification = await dbNotify.save();

    return { message: "Review successfully saved !!"};

}
async function postCommentActivity(details){
    const activityId= details.activityId; 
    const activityComment = {
        'userName': `${details.name}`,
        'userId':`${details.userId}`,
        'content': `${details.content}`,
    }

    const userFetch = await db.activities.findOneAndUpdate({ _id: activityId }, { $push: { comment: activityComment } });
    return { message: "Comment successfully posted !!"};
}

async function postLikeActivity(details){
    const activityId= details.activityId; 
    const dbPostThumbsUp = await db.activities.findOneAndUpdate({ _id: activityId }, { $inc: { likes: 1 } });
    return { message: "Thank you, likes added!" }
}

async function getSpecificMovieReviews(id){   
    const getReviewData = await db.reviews.find({movieId: id});
    return getReviewData;
}

async function deleteReviewInfo( userId, movieId, comment ){
    const deleteReview = db.reviews.deleteOne( { "_id" : movieId}, function (err) {
        if (err) return handleError(err)
    });
    const deleteUserReview = await db.users.update({ _id:  userId }, { "$pull": { "myReviews": { "comment": comment.comment } }}, { safe: true, multi:true }, function(err, obj) {
        console.log(err)
    });
    return { message: "Your Review has been deleted !!"};
}


//-----------------multer--------------------------------
async function updateAvatar( userId, imageUrl ){
    const imageData = {
        profileImg: imageUrl
     };
    const dbResult = await db.users.findOneAndUpdate({_id: userId}, imageData);
    const userFetch = await db.users.findOneAndUpdate({ _id: userId }, { $push: { friendList: {image: imageData} } });

    return { message: `Thank you, updated` }
}

async function bioResultDb( bioId, bioData ){
    const dbBioResult = await db.users.findOneAndUpdate({_id: bioId}, bioData);
    return dbBioResult;
}    

async function postComment(content){
    const comment = {
        'content': `${content.content}`,
        'userId':`${content.userId}`,
        'userName': `${content.name}`,
    }
    const dbPostComment = await db.reviews.findOneAndUpdate({ _id: content.reviewId }, { $push: { miniComments: comment } });
    return { message: `Thank you, comment added!` }

}

async function thumbsUp(likes){
    const dbPostThumbsUp = await db.reviews.findOneAndUpdate({ _id: likes.reviewId }, { $inc: { like: 1 } });
    return { message: `Thank you, likes added!` }
}

async function getNotifications(){
    const dbGetUpdates = await db.notifications.find({});
    return dbGetUpdates
}
async function postGroupInfo(info){
    const data = {
        "groupName": `${info.groupName}`,
        "groupImage": `${info.groupImage}`
    }
    const dbPostGroups = await db.users.findOneAndUpdate({ _id: info.id }, { $push: { myGroups: data } });
    return { message: `Success! Your group has been added !` }

}

async function getGroups(userId){
    const dbGetGroups = await db.users.find({ _id: userId });
    const returnValue = dbGetGroups[0].myGroups
    return returnValue
}
//-----tagdata----
async function postTagDb(details){
    const tagSchema = {
        movieId: details.movieId,
        userId: details.id, 
        title: details.title,
        image: details.image,  
        tags: details.tags,
    }
    const dbTags = new db.tags( tagSchema );
    const tagInfo = await dbTags.save();
    const updateTagsInUserScheema = await db.users.findByIdAndUpdate({_id:details.id},{ $push: {userTags: tagInfo._id }})
  
    return { message: "Tags successfully save!!"};

}
//---------post edit tags---
async function postEditTags(newtags){
    const newTags = newtags.tags;
    const updateTags = await db.tags.findOneAndUpdate({userId:newtags.userId}, {tags: newTags} )
    return { message: "Tags updated successfully !!"}

}
//--------gettagsdata-----
async function getTagsDb(id){
    let tagArray = [];
    let tagSingleArray = [];
    const getUserTags = await db.tags.find({ userId:id })

    for (i = 0; i < getUserTags.length; i++){
        tagArray.push(getUserTags[i].tags)
    }

    for( i = 0; i < tagArray.length; i++){
        for ( j = 0; j < tagArray[i].length; j++){
            tagSingleArray.push(tagArray[i][j]);
        }
    }

    const uniqueTags = tagSingleArray.filter(
    function (tag, i) {
        return tagSingleArray.indexOf(tag) === i
    });

    return uniqueTags;
    
}

async function getAllMoviesDb(id){
    const getAllTagMovies = await db.tags.find({ userId:id })
    return getAllTagMovies;

}

//------getmovietagdb---
async function getMoviesTagDb( id, tag ){
    const getMoviesTagDb = await db.tags.find({ userId:id, tags: tag})
    return (getMoviesTagDb)
}

//-------similartag movies---
async function movieTagDb( id, tag ){
    const similarTagMovies = await db.tags.find({tags: tag})
    const filterTagMovies = similarTagMovies.filter( function(movie){
        return movie.userId !== id 
    })
    return (filterTagMovies)
    
}
//---------deletemovietag----
async function deleteMoviebyTag( movieId, userId ){
    const deleteMovieByTag = await db.tags.findOneAndDelete({ $and: [{movieId:movieId}, {userId:userId}]
    },
    function (err) {
        if(err) console.log(err); 
    });
return { message: "Movie successfully deleted!!"} ;
}

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
    getFriendInfo,
    showProfileDb,
    postReview,
    getSpecificMovieReviews,
    deleteReviewInfo,
    bioResultDb,
    updateAvatar,
    postComment,
    thumbsUp,
    getActivitylist, 
    postCommentActivity,
    postLikeActivity,
    getNotifications,
    postGroupInfo,
    getGroups,
    postTagDb,
    getTagsDb,
    getMoviesTagDb,
    getAllMoviesDb,
    movieTagDb,
    postEditTags,
    deleteMoviebyTag
}