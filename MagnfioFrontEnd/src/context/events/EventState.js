import { useState } from 'react';
import eventContext from './eventContext';

const EventState = ({ children }) => {

    const [events, setEvents] = useState([]);
    const updateEvents = (val) => {
        setEvents(val);
    }
    return (
        <eventContext.Provider value={{ events, updateEvents }}>
            {children}
        </eventContext.Provider>
    )
}

export default EventState;