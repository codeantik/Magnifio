// import './tempDashboard.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './tempDashboardDark.css';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function TempDashboard() {

    const [events, setEvents] = useState([])

    const getCalendarEvents = async () => {
        const { data } = await axios.get(`http://3.87.73.247:8080/events`)
        setEvents(data);
        console.log('before', events);
        events.sort((a, b) => {
            const first = Date.parse(a.startTime);
            const second = Date.parse(b.startTime);
            return first - second;
        });
        console.log('sorted', events);
    }

    useEffect(() => {
        getCalendarEvents();
        
    }, [])



  return (
    <div className="tempdb-container">
        <aside className="tempdb-left">
            <div className="schedule">
                <h4>Schedule</h4>
                <div className="lines">
                    {events?.map((event, index) => {
                        // const dateString = new Date(event.startTime).toUTCString();
                        const dateString = new Date(event.startTime)
                                                .toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
                        return (
                            <div className="line" key={index}>
                                <h6>{dateString}</h6>
                                <div className="txt" style={{ marginLeft: '300px'}}>{event.subject}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="todolist">
                <h4>Todo List</h4>
                <div className="list">
                    <div className="todo">
                        <input type="checkbox" name="1" value="1" />
                        <label htmlFor="1">Lorem Ipsum</label>
                        <div>
                            <button>Confirm</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                    <div className="todo">
                        <input type="checkbox" name="2" value="2" />
                        <label htmlFor="2">Lorem Ipsum</label>
                        <div>
                            <button>Confirm</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                    <div className="todo">
                        <input type="checkbox" name="3" value="3" />
                        <label htmlFor="3">Lorem Ipsum</label>
                        <div>
                            <button>Confirm</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                    <div className="todo">
                        <input type="checkbox" name="4" value="4" />
                        <label htmlFor="4">Lorem Ipsum</label>
                        <div>
                            <button>Confirm</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                    {/* <div className="todo">
                        <input type="checkbox" name="5" value="5" />
                        <label htmlFor="5">Lorem Ipsum</label>
                        <div>
                            <button>Confirm</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                    <div className="todo">
                        <input type="checkbox" name="6" value="6" />
                        <label htmlFor="6">Lorem Ipsum</label>
                        <div>
                            <button>Confirm</button>
                            <button>Cancel</button>
                        </div>
                    </div> */}
                </div>
            </div>
        </aside>
        <aside className="tempdb-right">
            <div className="notification-container">
                <h4>Notifications</h4>
                <div className="notification">
                    <NotificationsActiveIcon style={{ width: '35px', height: '35px'}}/>
                    <div>
                        <h6>Task pending</h6>
                        <span style={{ position: 'relative', top: '-10px'}}>Just Now</span>
                    </div>
                </div>
                <div className="notification">
                    <NotificationsActiveIcon style={{ width: '35px', height: '35px'}}/>
                    <div>
                        <h6><span style={{ color: '#9edbd7', fontSize: '16px' }}>Dan</span> sent you a message</h6>
                        <span style={{ position: 'relative', top: '-10px'}}>1 hr ago</span>
                    </div>
                </div>
                <div className="notification">
                    <NotificationsActiveIcon style={{ width: '35px', height: '35px'}}/>
                    <div>
                        <h6><span style={{ color: '#9edbd7', fontSize: '16px' }}>Joe</span> sent you a message</h6>
                        <span style={{ position: 'relative', top: '-10px'}}>3 hr ago</span>
                    </div>
                </div>
                <div className="notification">
                    <NotificationsActiveIcon style={{ width: '35px', height: '35px'}}/>
                    <div>
                        <h6><span style={{ color: '#3c9295', fontSize: '16px' }}>Dan</span> accepted your request</h6>
                        <span style={{ position: 'relative', top: '-10px'}}>5 hr ago</span>
                    </div>
                </div>
                <div className="notification">
                    <NotificationsActiveIcon style={{ width: '35px', height: '35px'}}/>
                    <div>
                        <h6><span style={{ color: '#3c9295', fontSize: '16px' }}>John</span> accepted your request</h6>
                        <span style={{ position: 'relative', top: '-10px'}}>7 hr ago</span>
                    </div>
                </div>
                <div className="notification">
                    <NotificationsActiveIcon style={{ width: '35px', height: '35px'}}/>
                    <div>
                        <h6>Task awaiting</h6>
                        <span style={{ position: 'relative', top: '-10px'}}>8 hr ago</span>
                    </div>
                </div>
            </div>
        </aside>
    </div>
  );
}
