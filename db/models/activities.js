const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activities = new Schema({
    userId: {type: String},
    activity: String,   
    userName: String,
    activityType: String,   
    activity: String,   
    movie: {
        movieName: {type: String},
        movieId: {type: String},
        movieImg: {type: String}
    },
    friend: {
        friendName:  {type: String},
        friendId: {type: String},
        friendImg: {type: String}
    },
    review: {
        comment:  {type: String},
        rating: {type: String},
    },
    comment: String,
    likes: String
}, {
    timestamps: true 
});

module.exports = mongoose.model('activities', activities);