import React, { useEffect, useState, useRef } from 'react';
import './index.css';

const ChatRoom = ({ openedChatTab, setOpenedChatTab, socket }) => {

  const [position, setPosition] = useState(-100);
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    socket.on("messageRes", (data) => {
        setChat((prevChats) => [ ...prevChats, data]);
    });
  }, []);

  const handleMessage = (e) => {
    e.preventDefault();
    if(msg.trim() != ""){
        socket.emit("message", {msg});
        setChat((prevChats) => [...prevChats, {msg, name: "You"}]);
    }
    

  }

  const toggleChatRoom = () => {
    if (openedChatTab) {
      console.log("user clicked")
      setPosition(0);
    } else {
      setPosition(-100);
    }
    setOpenedChatTab(!openedChatTab);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (openedChatTab && !e.target.closest('.chat-room')) {
        toggleChatRoom();
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [openedChatTab]);

  return (
    <div
      className={`chat-room ${openedChatTab ? 'open' : ''}`}
      style={{ left: `${position}%` }}
    >
      <button
        type="button"
        onClick={toggleChatRoom}
        className="btn btn-light btn-block w-100 mt-5"
      >
        Close
      </button>
      <div className="chat-container">
        {/* Chat Display Area */}
        <div className="chat-display">
          {/* Example chat messages */}
          {
            chat.map((m, i) => (
                <div key={i} className="chat-message">
                    <div className="chat-sender">{m.name}:</div>
                    <div className="chat-text">{m.msg}</div>
                </div>
            ))
          }
          {/* Add more chat messages here */}
        </div>

        {/* Input Field and Send Button */}
        <div className="chat-input">
          <input type="text" placeholder="Enter a message" value={msg} onChange={(e) => setMsg(e.target.value)}/>
          <button type="button" onClick={handleMessage}>Enter</button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
