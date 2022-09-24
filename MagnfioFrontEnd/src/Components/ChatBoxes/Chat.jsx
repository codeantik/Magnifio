import { useContext, useEffect, useRef } from "react";
import discord from "../../images/discord.svg";
import slack from "../../images/slack.svg";
import emailContext from "../../context/emails/emailContext";
import "../ChatBoxes/Chat.css";

export default function Chat() {
	const { emails } = useContext(emailContext);
	const frameContainerRef = useRef(null);

	const getEmails = () => {
		console.log(emails);
		console.log(frameContainerRef);
	};

	const showEmails = () => {
		emails.forEach((email) => {
			let iframe = document.createElement("iframe");

			frameContainerRef.current.appendChild(iframe);

			iframe.contentWindow.document.open();
			iframe.setAttribute("style", "height: 80vh; width: 70%; margin: 3%");
			iframe.contentWindow.document.write(email), iframe;
		});
	};

	useEffect(() => {
		showEmails();
	}, []);

	return (
		<div className="chatbox-container">
			<div className="chatbox-normal">
				<div className="chatbox-normal-body">
					<div className="chatbox-normal-text">
						<p>This is the chat text</p>
					</div>
				</div>
				<div className="chatbox-normal-detail">
					<span style={{ color: "gray" }}>3:30 am</span>
					<img src={discord} alt="app" height="30" width="30" />
				</div>
			</div>
			<div className="chatbox-email">
				<div className="chatbox-email-subject">
					Subject: Something Important
				</div>
				<hr />
				<div className="chatbox-email-body">
					<p>Dear sir, </p>
					<p> lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
					<p> lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
					<p> lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
					<p> lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
					<p> lorem ipsum</p>
					<br></br>
					<p>Regards,</p>
					<p>John Doe</p>
				</div>
				<button onClick={getEmails}>Get Emails</button>
			</div>
			<div
				className="chatbox-contextEmails"
				ref={frameContainerRef}
				id="iframe-container"
			>
				{/* {emails.map((email, index) => {
          return (
            <iframe key={index} height="100vh" width='100%' srcDoc={email} />
          )
        })} */}
			</div>
		</div>
	);
}
