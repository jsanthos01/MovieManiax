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
   profileImg: {
      type: String,
      default: 'https://getdrawings.com/free-icon-bw/anonymous-avatar-icon-19.png'  
   },
   bio: {
      type: String,
      default: 'Tell the world something about yourself'  
   },
   favourites: [
      { 
         movieId: {type: String},
         title: {type: String},
         image: {type: String},
         ratings: {type: String},
      }
   ],
   watchlist: [
      {
         movieId: {type: String},
         title: {type: String},
         popularity: {type: String},
         image: {type: String},
         description: {type: String},
         ratings: {type: String},
         releaseDate: {type: String}
      }
   ],
   friendList: [
      {
         userId: {type: String},
         friendId: {type: String},
         name: {type: String},
         image: {type: String},
      }
   ],
   myReviews: [
      {
         movieId: {type: String},
         movieImage: {type: String},
         comment: {type: String},
         rating: {type: String},
         movieName: {type: String}
      }
   ],
   myGroups: [
      {
         groupName:{type: String},
         groupImage:{type: String}
      }
   ],
   userTags: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "tags"
       }
    ]
 }, {
    timestamps: true
 });

module.exports = mongoose.model('users', users);
