import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './Join.css'
function Join() {
    // 1. Name of user is stored
    // 2. Room of user is stored
    const [ name, setName ] = useState('');
    const [ room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                {/* 3. get the values of both inputs and put it inside setName and setRoom */}
                <div><input placeholder="" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}  /></div>
                
                {/* 
                    4. Set the name of user and room inside the url
                    5. Prevent the user from going to chat.js if any of the inputs are empty
                */}
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat/${name}/${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
