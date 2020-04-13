const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let users = new Schema ({
   name : { 
      type: String,
      trim: true,
      required: true
   },
   email : { 
      type: String, 
      required: true, 
      trim: true, 
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'] 
   },
   password :  { 
      type: String, 
      required: true, 
      trim: true
   },
   session: { type: String, default: '' },

   favouriteMovie: [
      { 
         id: mongoose.Types.ObjectId,
         title: {type: String},
         image: {type: String},
         ratings: {type: String}
      }
   ],

   watchlist: [
      {
         title: {type: String},
         popularity: {type: String},
         image: {type: String},
         description: {type: String},
         ratings: {type: String},
         releaseDate: {type: String}
      }
   ],
   friendList: [
      //Sara will need to add
   ]
 }, {
    timestamps: true
 });

module.exports = mongoose.model('users', users);
