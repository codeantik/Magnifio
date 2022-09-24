import { useState } from 'react';
import emailContext from './emailContext';

const EmailState = ({ children }) => {

    const [emails, setEmails] = useState([]);
    const updateEmails = (val) => {
        setEmails(val);
    }
    return (
        <emailContext.Provider value={{ emails, updateEmails }}>
            {children}
        </emailContext.Provider>
    )
}

export default EmailState;