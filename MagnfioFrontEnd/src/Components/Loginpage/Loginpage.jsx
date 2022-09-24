import React, { useState, useContext } from 'react';
import './loginpage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MicrosoftLogin from "react-microsoft-login";
import { useHistory } from 'react-router';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import emailContext from '../../context/emails/emailContext';
import userContext from '../../context/user/userContext';
import eventContext from '../../context/events/eventContext';
import { Base64 } from 'js-base64';
import { Link } from 'react-router-dom';


const gapi = window.gapi
const CLIENT_ID = "820832714946-5qladfn84bkjhr6g978qr5sasmrv8cg6.apps.googleusercontent.com"
const API_KEY = "AIzaSyCbJwXUQP4gLxiplgrkxl1UtzvR1VHc-rA"
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
  // 'https://people.googleapis.com/$discovery/rest?version=v1'
]
let SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/calendar.readonly',
  // 'https://www.googleapis.com/auth/contacts.readonly'
].join(' ');

let resource = {
  "summary": "Appointment",
  "location": "Somewhere",
  "start": {
    "dateTime": "2022-02-16T10:00:00.000-07:00"
  },
  "end": {
    "dateTime": "2022-02-16T10:25:00.000-07:00"
  }
};


export function createEvent(eventData) {
  gapi.client
    .request({
      path: '/calendar/v3/calendars/primary/events?conferenceDataVersion=1&&sendNotifications=true',
      method: 'POST',
      body: eventData,
    })
    .then(function (resp) {
      console.log('event created', resp.result);
    })
    .catch(err => console.error(err))
}

export function deleteEvent(id) {
  var request = gapi.client.calendar.events.delete({
    calendarId: 'primary',
    eventId: id,
  });

  request.execute(function (response) {
    if (response.error || response == false) {
      console.error('Error');
    } else {
      alert('Event deleted successfully');
    }
  });
}

export function updateEvent(id, data) {
  var request = gapi.client.calendar.events.update({
    calendarId: 'primary',
    eventId: id,
    resource: data,
  });
  request.execute(function (event) {
    alert('Event updated successfully');
  });
}


export default function Loginpage() {

  let contextEmail = [];
  const { updateEmails } = useContext(emailContext);
  const { updateUser } = useContext(userContext);
  const { updateEvents } = useContext(eventContext);
  const [emailList, setEmailList] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory()

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const redirectPage = token => {
    console.log('redirect')
    sessionStorage.setItem('accessToken', JSON.stringify(token))
    history.push('/')
  }


  const postEvents = async (events) => {
    const req = axios.post("http://3.87.73.247:8080/events",
          events
        )
        .then(data => {
          console.log(data)
          return data
        })
        .catch(err => {
          console.log(err)
        })

        console.log(req)
  }


  // getting emails
    function getEmails() {
      const res = gapi.client.gmail.users.messages.list({
        userId: 'me',
        labelIds: ['INBOX'],
        maxResults: 100,
      });
      console.log('email result', res);
      res.execute(getMessagesData);

      // res.execute(getOneMessage);
    }

    const getMessagesData = (response) => {
      const messages = response.result.messages
        ? response.result.messages
        : [];

      messages.forEach((message) => {
        window.gapi.client.gmail.users.messages
          .get({
            userId: 'me',
            id: message.id,
            format: 'full',
            labelIds: ['INBOX'],
          })
          .then(
            (response) => {
                let Obj = {}
                let emails = response.result;
                // console.log(emails)
                Obj.id = emails.id;
                Obj.snippet = emails.snippet;
                // const part = response.result.payload.parts[0].body.data;
                // console.log('emails', emails);
                // console.log('emails.payload', emails.payload);

                emails.payload.headers.forEach(item => {
                  if (item.name === 'From') {
                    Obj.from = item.value;
                  }
                  if (item.name === 'Subject') {
                    Obj.subject = item.value;
                  }
                  if(item.name === 'Date'){
                    Obj.date = item.value;
                  }
                })

                const payload = getMessageBody(emails.payload)
                // console.log('payload', payload)
                Obj.payload = payload
                // setEmailList((prevState) => [...prevState, Obj]);
                contextEmail.push(Obj);
                // console.log('contextEmail', contextEmail)
                // console.log(emailList)
            },
            (err) => {
              console.error('getMessagesData error', err);
            }
          );
      });
    };

    const getMessageBody = (message) => {
      const encodedBody =
        typeof message.parts === 'undefined'
          ? message.body.data
          : getHTMLPart(message.parts);

      return Base64.decode(encodedBody);
    };

    const getHTMLPart = (arr) => {
      for (let x = 0; x < arr.length; x++) {
        if (typeof arr[x].parts === 'undefined') {
          if (arr[x].mimeType === 'text/html') {
            return arr[x].body.data;
          }
        } else {
          return getHTMLPart(arr[x].parts);
        }
      }
      return '';
    };

  const createUser = async (req) => {
    console.log(req.gv);
    const payload = {
      email: req.gv.tv,
      full_name: req.gv.zf,
      profile_pic: req.gv.gO
    }
    
    updateUser(payload)

    await axios.post('http://54.174.147.70:8080/api/v1/user/create', payload)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // calendar operations


  // google auth
  const handleGoogleAuth = (e) => {
    e.preventDefault()
    console.log('clicked')
  //   const gapi = window.gapi

  //   const CLIENT_ID = "820832714946-5qladfn84bkjhr6g978qr5sasmrv8cg6.apps.googleusercontent.com"
  //   const API_KEY = "AIzaSyCbJwXUQP4gLxiplgrkxl1UtzvR1VHc-rA"
  //   const DISCOVERY_DOCS = [
  //     "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  //     'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
  //     // 'https://people.googleapis.com/$discovery/rest?version=v1'
  //   ]
  //   let SCOPES = [
  //     'https://www.googleapis.com/auth/calendar.events',
  //     'https://www.googleapis.com/auth/gmail.readonly',
  //     'https://www.googleapis.com/auth/calendar.readonly',
  //     // 'https://www.googleapis.com/auth/contacts.readonly'
  // ]
  //   SCOPES = SCOPES.join(' ');
    

    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('calendar!'))
      gapi.client.load('gmail', 'v1', () => console.log('gmail!'))

      gapi.auth2.getAuthInstance().signIn()
      .then((res) => {
        console.log('res', res)
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          
          const data = response.result.items
          console.log('response', response)
          // console.log(gapi.auth2.getAuthInstance().currentUser)
          // console.log('EVENTS: ', data)
          let eventData = []
          eventData = data.map(event => {
            return ({
              eventId: event.id,
              subject: event.summary,
              startTime: event.start.dateTime,
              endTime: event.end.dateTime,
              attendees: event.attendees,
            })
          })
          console.log('EVENTS', eventData)
          // listConnectionNames()
          // postEvents(eventData)
          updateEvents(eventData)
        })
                
      getEmails()
      console.log(emailList)
      // update(emailList); // update context
      updateEmails(contextEmail); // update context
      createUser(res); // create user for chat
      console.log(res);
      if(res && res.Cc.access_token)  {
        redirectPage(res.Cc.access_token)
      }
        
      })
    })
  }

  const authHandler = (err, data) => {
    console.log(err, data)
    const options = {
        method: "GET",
        headers: {
          'Authorization' : `Bearer ${data.accessToken}`
        }
    };
    
    fetch("https://graph.microsoft.com/v1.0/me/events", options)
      .then((res) => {
        return res.json()
      }).then((cal) =>{
        console.log(cal.value)
        // console.log(cal.value[0].id, cal.value[0].start.dateTime, cal.value[0].subject)
        // console.log(cal.value)
        let events = []
        events = cal.value.map(event => {
          return ({
            eventId: event.id,
            subject: event.subject,
            startTime: event.start.dateTime,
            endTime: event.end.dateTime,
          })
        })
        console.log(events)
        postEvents(events)
        updateEvents(events)
        
      })
      .catch(error => console.log(error));

    
    if(data && data.accessToken) redirectPage(data.accessToken)
  };

  const handleLogin = async () => {
    try {
      const loginUserData = {
        password: password,
        email: email,
      }
      
      const loginRequest = await axios
        .post('https://magnifionode-api.herokuapp.com/users/login',
          loginUserData
        )
        .then(data => {
          console.log(data)
          return data
        })
        .catch(err => 
          toast.error(err.response.data.message)
        );

        const { message } = loginRequest.data;
    
        if (message) {
          toast.success(message);
          // history.push("/")
          setTimeout(() => {
            redirectPage("secretToken")
          }, 3000)
        }
      } catch (error) {
        toast.error(error);
      }
  }

  return (
    <div className="login">
      <Helmet>
        <title>Magnif.io | Login</title>
      </Helmet>
      <ToastContainer
        position="top-center"
        autoClose={false}
        theme="dark"
      />
      <div className="login-page">
        <aside className="left"></aside>
        <aside className="right">
          <h1>Login</h1>
          <form className="login-detalis">
            <p>Email</p>
            <input
              type="email"
              placeholder="Enter Your Email"
              onChange={handleEmail}
            />
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter Your Password"
              onChange={handlePassword}
            />
            <span className="forgot-password">forgot password?</span>
            <span type="submit" className="login-button" onClick={handleLogin}>
              Sign In
            </span>
            <button
              className="google"
              onClick={handleGoogleAuth}
            >
              Login with Google
            </button>
            <MicrosoftLogin 
              className="outlook"
              clientId={process.env.REACT_APP_OUTLOOK_CLIENT_ID} 
              authCallback={authHandler}
              graphScopes={['calendars.read', 'user.read', 'openid', 'profile', 'people.read', 'user.readbasic.all']}
            />
            <span className="login-page-create-account">
              Not registered yet?{' '}
              <Link to="/register" style={{ color: 'blue', paddingLeft: '4px', textDecoration: 'none' }}>
                Create an account
              </Link>
            </span>
          </form>
        </aside>
      </div>
    </div>
  );
}
