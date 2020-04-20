const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comments = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    content: {
        type: String
    }
});
 
module.exports = mongoose.model('comments', comments);