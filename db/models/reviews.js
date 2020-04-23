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
    // comments: [
    //    {
    //         userId: {type: String},
    //         name: {type: String},
    //         profilePic: {type: String},
    //         description: {type: String}
    //     }
    // ],
    // likes: Number
    
}, {
    timestamps: true 
});
 
module.exports = mongoose.model('reviews', reviews);