const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );

mongoose.connect(`mongodb://localhost:27017/movieTracker`, {useNewUrlParser: true});

const db = require( './models' );



module.exports = {

}