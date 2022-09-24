import React, { useState, useEffect } from "react";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import Email from "./Email/Email";
import NormalChat from "./NormalChat/NormalChat";
import "../Chat/Chat.css";
import "./chatDark.css";

// let socket = io('https://New-chat.earn-withwith.repl.co');
export default function App() {
	const [message, setMessage] = useState("");
	const [name, setUsername] = useState("");
	const [messageList, setMessageList] = useState([]);
	const [typingUserName, setTypingUserName] = useState();
	const [userslist, setUserList] = useState();
	const [timer, setTimer] = useState(null);
	const [type, setType] = useState(false);
	const [selectedCatergoy, setSelectedCategory] = useState("");

	let socket = io("https://magnifio-sockets.herokuapp.com/");

	const inputChanged = (e) => {
		setMessage(e.target.value);
		clearTimeout(timer);
		socket.emit("typing", { type: true, username: name });

		const newTimer = setTimeout(() => {
			//setType(false)
			socket.emit("typing", { type: false });
		}, 1000);

		setTimer(newTimer);
	};

	socket.on("typing", (data) => {
		setType(data.type);
		setTypingUserName(data.username);
	});

	const sendMessage = () => {
		const messageData = {
			msg: message,
			username: name,
		};
		socket.emit("chatMessage", messageData);
		setMessage("");
	};

	// useEffect(() => {
	//   socket.on('roomUsers', (userslist) => {
	//     console.log(userslist)
	//     setUserList(userslist.users);
	//   });

	//     socket.on('message', (messagee) => {
	//     //console.log(messagee);
	//     setMessageList((list) => [...list, messagee]);
	//   });
	// }, [socket]);

	// useEffect(() => {
	//   var username = prompt('enter your name');
	//   var room = prompt('enter your roomUsers');

	//   setUsername(username);
	//   const userData = {
	//     room: room,
	//     username: username,
	//   };
	//   socket.emit('joinRoom', userData);
	// }, []);

	useEffect(() => {
		socket.on("connect", () => {
			console.log("socket connected");
		});
		socket.emit("join", { name: "all" });
	}, []);

	// const handleClick = (e) => {
	//   // e.preventDefault()
	//   socket.emit("join", { name: "Ankit#4101" });
	//   // socket.emit("join", { name: "pranay999000#7542" });
	// };

	useEffect(() => {
		socket.on("allMessage", (data) => {
			console.log("allMessageData", data);
		});

		socket.on("message", (data) => {
			console.log(data);
		});
	}, [socket]);

	console.log(selectedCatergoy);

	return (
		<div class="chat-wrapper">
			<div className="chat-container">
				<div className="serach-and-group">
					<div className="search-user-div">
						<input type="search" placeholder="search here..." />
					</div>

					<div className="chat-group-div">
						<h5>Contacts</h5>
						{userslist?.map((usersList) => {
							return (
								<div className="group-list">
									<AccountCircleIcon className="chat-user-icon" />
									<div className="chat-board-user-name">
										<h6 style={{ fontSize: "20px" }}>{usersList.username}</h6>
										<span>Text message</span>
									</div>
									{/* <div style={{ marginLeft: '60px' }}>3:30 pm</div> */}
								</div>
							);
						})}
					</div>

					<div className="chat-group-div">
						<h5>Groups</h5>
						<div className="group-list">
							<AccountCircleIcon className="chat-user-icon" />
							<div className="chat-board-user-name">
								<h6 style={{ fontSize: "18px" }}>Magnifio</h6>
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
								<h5 style={{ fontSize: "25px" }}>Magnifio</h5>
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
							{/* {messageList?.map((result, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="message"
                      id={name == result?.username ? 'you' : 'other'}
                    >
                      <div>
                        <div className="message-meta">
                          <p id="author">{result?.username == name}</p>
                        </div>
                        <div className="message-content">
                          <p>{result?.text}</p>
                        </div>
                        <div className="message-meta">
                          <p id="time">{result?.time}</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
              {type && (
                <div>
                  <h5 style={{ marginLeft: '5%' }}>{typingUserName}</h5>
                  <div className="bubble">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              )} */}
							{/* <Email /> */}
							{/* <NormalChat /> */}
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
