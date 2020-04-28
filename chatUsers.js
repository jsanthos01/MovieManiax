//THESE ARE USER HELPER FUNCTIONS 
const users = [];

//Adding a user has 3 parameters (id of the socket instance, name of user and room they joined)
function addUser ({id, name, room}) {
    //1. simply remove white space and make of the letters lowercase
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //2. going through the users array (LINE 2), and checking if the user's name already exists for that specific room.
    const existingUser = users.find(user => user.room === room && user.name === name );
    
    //3,. if existing user is found, send an error statement
    if(existingUser) {
        return {error: "Username is taken!"}
    }

    //4. if there is no user with particular name in that particular room, then create an object with the necessary details of the user 
    const user = {id, name, room};
    //push the object inside of the users array 
    users.push(user);
    return {user}
}

//find user with that specific id and remove them 
function removeUser(id) {
    const index = users.findIndex((user) => user.id === id);

    // if user exists inside that array, then remove the user form the users array and return that user
    if(index !== -1){
        return users.splice(index,1)[0];
    }
}

//find a specific user by their id
function getUser(id){
    console.log("[inside getUser", id);
    console.log("users array: ", users)
    return users.find((user) => user.id ===id);
    
}

//get all the users in a specific room
function getUsersInRoom(room){
    users.filter((user) => user.room === room);
}

//export all these functions
module.exports = {addUser, removeUser, getUser, getUsersInRoom}