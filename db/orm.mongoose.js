const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );

// mongoose.connect(`mongodb://${process.env.movieTracker}`,{useNewUrlParser: true});

mongoose.connect(`mongodb://localhost:27017/movieTracker`, {useNewUrlParser: true});

// mongoose.connect(`mongodb://localhost:27017/movieTracker`, {useNewUrlParser: true});

const db = require( './models' );


// input: <object> { name, email, password }
// output: { message, id, name }
async function registerUser( userData ){
    if( !userData.password || !userData.name || !userData.email ){
        console.log( `[registerUser] invalid userData! `, userData );
        return { message: "Invalid user data", id: "", name: "" };
    }
    
    console.log( `[registerUser], userData: `, userData );
    const saltRounds = 10;
 
    const passwordHash = await bcrypt.hash(userData.password, saltRounds);
    console.log( `[registerUser] (hash=${passwordHash}) req.body:`, userData );
    const saveData = {
       name: userData.name,
       email: userData.email,
       password: passwordHash
    };
    const dbUser = new db.users( saveData );
    const saveUser = await dbUser.save();
    return { message: "User successfully saved", id: saveUser._id};
 }

// input: email, password
// output: <object> { userId, firstName, lastName, emailAddress, creationTime } || false
// async function loginUser( email, password ) {
//    const userFetch = await db.users.findOne({ emailAddress: email });
//    console.log( `[loadUser] email='${email}' userFetch:`, userFetch );
//    if( !userFetch ) {
//       return false;
//    }

//    const isValidPassword = await bcrypt.compare( password, userFetch.userPassword );
//    console.log( ` [loginUser] checking password (password: ${password} ) hash(${userFetch.userPassword})`, isValidPassword );
//    if( !isValidPassword ) {
//       return false;
//    }

//    // remap the data into the specified fields as we are using camelCase
//    const userData = {
//       userId: userFetch._id,
//       firstName: userFetch.firstName,
//       lastName: userFetch.lastName,
//       emailAddress: userFetch.emailAddress,
//       creationTime: userFetch.createdAt
//    };
//    return userData;
// }

module.exports = {

    registerUser
}