const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tags = new Schema({
    movieId: {type: String},
    userId: {type: String},   
    title:{type: String},
    image:{type: String},
    tags: []   
}, 
{users:
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: "users"
     } 
},
{
    timestamps: true 
});
 
module.exports = mongoose.model('tags', tags);