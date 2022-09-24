import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Loginpage from "./Components/Loginpage/Loginpage";
import Register from "./Components/Registerpage/Register";
import EmailState from "./context/emails/EmailState";
import UserState from "./context/user/UserState";
import EventState from "./context/events/EventState";

import "./style.css";

export default function App() {
	return (
		<>
			<EventState>
				<UserState>
					<EmailState>
						<Router>
							<Switch>
								<Route exact path="/login" title="Login">
									<Loginpage />
								</Route>
								<Route exact path="/register" title="Register">
									<Register />
								</Route>
								<Route exact path="/">
									<Homepage />
								</Route>
							</Switch>
						</Router>
					</EmailState>
				</UserState>
			</EventState>
		</>
	);
}
