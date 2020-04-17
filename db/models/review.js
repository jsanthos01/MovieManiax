const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviews = new Schema({
    movieId: {type: String},
    movieName: {type: String},
    rating: Number,
    user: { 
        name: String,
        id: String
    },   
    comment: String,
    
}, {
    timestamps: true /* creates corresponding timestamp fields: createdAt, updatedAt */
});
 
module.exports = mongoose.model('reviews', reviews);