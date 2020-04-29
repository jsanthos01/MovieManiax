import React, { useState, useEffect,  } from 'react';
import {useParams} from 'react-router-dom'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from  '../InfoBar/InfoBar'
import Input from  '../Input/Input'
import Messages from  '../Messages/Messages'


let socket;

function Chat() {
  const [ userName, setUserName ] = useState('');
  const [ userRoom, setUserRoom] = useState('');
  const [ message, setMessage] = useState('');
    // 2. get the name of user and room from the chat URL
    const {name, room} = useParams();
  //stores all the messages for a specific room
  const [allMessages, setAllMessages] = useState([]);

  const ENDPOINT = "https://movie-app123.herokuapp.com/";
  // 1. Runs when the component renders - we need to immediately retrieve user's info while they join
  useEffect(() =>{
    console.log(`URL name: ${name}, room: ${room}`);

    //3. Here, we set up a socket connection which now connects to the backend io.on()
    socket = io.connect(ENDPOINT);
    setUserName(name);
    setUserRoom(room);

    //5. socket.emit() - sending to specific client only
    //6. When user joins, send the name and room to the backend
    //7. third parameter can be used when the callback function is called in server.js
    socket.emit('join', {name, room}, (error) => {
      if(error) {
        alert(error);
      }
    }); 

    //10. When you leave the chat, immediately call the disconnect event in server.js which will close the chat room
    return () => {
      socket.emit("disconnect");
      socket.off();
    }

    //4. only if the endpoint or parameters in the url changes
  }, [ENDPOINT], {name, room})

  //This send useEffect is used to handle messages
  useEffect(() => {
    socket.on("message", (message) => {
      // 8.adding the messages recieved from admin or users inside allMessages Array 
      setAllMessages([...allMessages, message]);
      // 9. the useEffect is only run when the allMessages array changes
    }, [allMessages])

  })
  //function for sending messages 
  function sendMessage(event) {
    event.preventDefault();

    if(message){
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  return (
    <div class="outerContainer">
      <div class="innerChatContainer">
        <InfoBar room={room} />
        <Messages allMessages={allMessages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  )
}

export default Chat
