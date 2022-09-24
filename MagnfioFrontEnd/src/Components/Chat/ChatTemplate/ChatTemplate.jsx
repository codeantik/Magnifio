import React, { useState, useEffect } from 'react';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScrollToBottom from 'react-scroll-to-bottom';
import Email from '../Email/Email';
import Discord from '../Discord/Discord';
import NormalChat from '../NormalChat/NormalChat';
import Jira from '../Jira/Jira';
import './chatTemplate.css';
import './chatTemplateDark.css';

export default function ChatTemplate({ selectedCategory }) {

  const [message, setMessage] = useState('');
  const [userList, setUserList] = useState([]);

  const sendMessage = () => {}
  const inputChanged = (e) => {}

  return (
      <div className='chat-wrapper'>
      <div className="chat-container">
        <div className="serach-and-group">
          <div className="search-user-div">
            <input type="search" placeholder="search here..." />
          </div>

          <div className="chat-group-div">
            <h5>Contacts</h5>
            {userList?.map((user) => {
              return (
                  <div className="group-list">
                    <AccountCircleIcon className="chat-user-icon" />
                    <div className="chat-board-user-name">
                      <h6 style={{ fontSize: '20px'}}>{user.username}</h6>
                      <span>Text message</span>
                    </div>
                    {/* <div style={{ marginLeft: '60px' }}>3:30 pm</div> */}
                  </div>
                )}
              )
            }
          </div>

          <div className="chat-group-div">
            <h5>Groups</h5>
            <div className="group-list">
              <AccountCircleIcon className="chat-user-icon" />
              <div className="chat-board-user-name">
                <h6 style={{ fontSize: '18px'}}>Magnifio</h6>
                <span>Text message</span>
              </div>
              {/* <div style={{ marginLeft: '60px' }}>2:30 pm</div> */}
            </div>
          </div>
        </div>
        <div className="chat-board">
          <header className="chat-board-header">
            <div className="chat-board-user-info">
              <AccountCircleIcon className="chat-header-user-icon" />
              <div className="chat-board-user-name">
                <h5 style={{ fontSize: '25px' }}>Magnifio</h5>
                {/* <span className="user-status">online</span> */}
              </div>
            </div>
            <div className="header-icons">
              <span>
                <CallIcon />
              </span>
              <span>
                <VideocamIcon />
              </span>
              <span>
                <MoreVertIcon />
              </span>
            </div>
          </header>
          <div>
            <ScrollToBottom className="scroll-to-bottom">
              {selectedCategory === 'email' && <Email /> }
              {selectedCategory === 'discord' && <Discord /> }
              {selectedCategory === 'jira' && <Jira /> }
            </ScrollToBottom>
          </div>
          <footer className="chat-footer">
            <input
              className="input"
              type="text"
              value={message}
              placeholder="Type message..."
              onChange={inputChanged}
            />
            {message ? (
              <SendIcon className="send-icon" onClick={sendMessage} />
            ) : (
              <MicIcon className="mic-icon" />
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}
