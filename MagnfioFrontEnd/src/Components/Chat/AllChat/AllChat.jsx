import React from 'react';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScrollToBottom from 'react-scroll-to-bottom';
import Email from '../Email/Email';
import Discord from '../Discord/Discord';
import Jira from '../Jira/Jira';
// import './allChat.css';
import './allChatDark.css';


export default function AllChat({ selectedCategory }) {
  
  return (
      <div className="allchat-container">
        <div className="allchat-board">
          <header className="allchat-board-header">
            <div className="allchat-board-user-info">
              <AccountCircleIcon className="allchat-header-user-icon" />
              <div className="allchat-board-user-name">
                <h5 style={{ fontSize: '25px' }}>Magnifio</h5>
              </div>
            </div>
            <div className="allheader-icons">
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
            <ScrollToBottom className="allscroll-to-bottom">
              <Discord />
              <Email />
              <Jira />
            </ScrollToBottom>
          </div>
        </div>
      </div>
  );
}
