import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './discordDark.css';
// import './discord.css';

const Discord = () => {
  const [discordMessages, setDiscordMessages] = useState([]);
  const [prevMessages, setPrevMessages] = useState([]);

  const socket = io("https://magnifio-sockets.herokuapp.com/");

  const fetchPreviousMessages = async () => {
    await axios.post(`http://54.174.147.70:8080/api/v1/discordMessages`, {
      body: {
        skip: 2,
        limit: 100,
      },
    })
    .then(res => {
      console.log('discord', res);
      setPrevMessages(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });

  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("discord socket connected");
    });
    socket.emit("join", { name: "all" });

    // get previous messages
    fetchPreviousMessages();

  }, []);

  useEffect(() => {
    socket.on("allMessage", (data) => {
      console.log('allMessageData', data);
    })
    
    socket.on("message", (data) => {
      console.log(data);
    });
  }, [socket]);

    return (
        <div className="discordContainer">
            {prevMessages.map((message, index) => (
              <div className="discordWrapper" key={index}>
                <div className="discordMessageContainer" key={message._id}>
                  <h5 className="name">{message.name}</h5>
                  <span className="channelName">{message.channel}</span>
                  <div style={{ color: 'white', padding: '8px'}}>{message.content}</div>
                  <span className="timeStamp">{message.botTime?.toLocaleString()}</span>
                </div>
                {/* <div className="discordMessageContainer" key={message._id}>
                  <h5 className="name">{message.name}</h5>
                  <span className="channelName">{message.channel}</span>
                  <div style={{ color: 'white', padding: '8px'}}>{message.content}</div>
                  <span className="timeStamp">{message.botTime}</span>
                </div>
                <div className="discordMessageContainer" key={message._id}>
                  <h5 className="name">{message.name}</h5>
                  <span className="channelName">{message.channel}</span>
                  <div style={{ color: 'white', padding: '8px'}}>{message.content}</div>
                  <span className="timeStamp">{message.botTime}</span>
                </div> */}
              </div>
            ))}
        </div>
    );
}

export default Discord;