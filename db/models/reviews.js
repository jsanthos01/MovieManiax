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
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }
}, {
    timestamps: true 
});
 
module.exports = mongoose.model('reviews', reviews);