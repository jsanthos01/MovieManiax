require('dotenv').config(); // --> process.env
const express = require( 'express' );
const fs = require('fs');
const orm = require( './db/orm.mongoose' );

const PORT = process.env.PORT || 8080;

const app = express();
// const upload = require('multer')({ dest: 'public/uploads/' });

// PORT is only set by Heroku, else we know it's local

app.use( express.static('client/build/') );
app.use( express.urlencoded({ extended: false }) );
app.use( express.json() );

app.post('/api/user/registration', async function( req,res ){
    const userData = req.body;
    // console.log( `[POST: /api/user/registration] userData: `, userData );
    
    const registerResult = await orm.registerUser( userData );
    res.send(registerResult);
    console.log(registerResult);
})

app.post('/api/user/login', async function( req,res ){
    const userData = req.body;
    // console.log( `[POST: /api/user/login] userData: `, userData );
    const loginResult = await orm.loginUser( userData.email, userData.password );
    loginResult.rememberMe = req.body.rememberMe;
    res.send( loginResult );
    
});

app.post('/api/user/logout', needSession, async function( req,res ){
    console.log( `[POST: /api/user/logout] userData: ` );

    const logoutResult = await orm.logoutUser( req.headers.session );
    res.send( logoutResult );
});


app.listen( PORT, function(){
    console.log( `[everest server] RUNNING, http://localhost:${PORT}` );
 });