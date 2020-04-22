const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviews = new Schema({
    movieId: {type: String},
    rating: String,
    user: { 
        name:{type: String},
        id: {type: String},
    },   
    comment: String,
    miniComments: [
        {
            content: {type: String},
            userId: {type: String},
            userName: {type: String}
        }
    ],
    like: {
        type: Number,
        default: 0 
    }
}, {
    timestamps: true 
});
 
module.exports = mongoose.model('reviews', reviews);