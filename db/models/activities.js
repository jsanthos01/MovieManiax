const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activities = new Schema({
    userId: {type: String},
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
    comment: [{
        userName: {type: String},
        userId: {type: String},
        content: {type: String},
    }],
    likes: {
        type: Number, 
        default: 0
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('activities', activities);