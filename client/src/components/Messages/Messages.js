import React from 'react'
import './Messages.css'
import Message from  '../Message/Message'

import ScrollToBottom from 'react-scroll-to-bottom'
function Messages({allMessages , name}) {
    return (
        <ScrollToBottom className="messages">
            {allMessages.map((message, idx) => 
                <div key={idx}>
                  <Message message={message} name={name} />
                </div>
            )}
        </ScrollToBottom>
    )
}

export default Messages
