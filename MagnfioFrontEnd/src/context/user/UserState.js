import { useState } from 'react';
import userContext from './userContext';

const UserState = ({ children }) => {

    const [user, setUser] = useState({});
    const updateUser = (val) => {
        setUser(val);
    }
    return (
        <userContext.Provider value={{ user, updateUser }}>
            {children}
        </userContext.Provider>
    )
}

export default UserState;