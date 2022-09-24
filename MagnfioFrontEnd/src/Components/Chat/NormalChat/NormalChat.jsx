import { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import userContext from '../../../context/user/userContext';

export default function NormalChat() {
    
    const socket = io(`http://54.174.147.70:8080`);
    const { user } = useContext(userContext);


    // individual message

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected');
        })
        socket.emit('add', user.email);
        socket.emit('join', { user_id: user.email });

        // group socket
        socket.emit('join-group', { name: 'Group01' })
    }, [])

    const handleSendIndividualMessage = () => {
        socket.emit('message', {
            to: 'ankit.sin099@gmail.com',
            from: user.email,
            message: 'hello pranay',
        })
    }

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message);
        })
        
    }, [socket])

    // group message

    const handleSendGroupMessage = () => {
        socket.emit('group-message', { 
            from: user.email,
            name: 'Group01', 
            message: 'hello is this group01' 
        })
    }

    useEffect(() => {
        // group socket
        socket.on('group-message', (group_message) => {
            console.log(group_message)
        })
    }, [socket])



    return (
        <div>
            <button onClick={handleSendIndividualMessage}>Send Individual Message</button>
            <button onClick={handleSendGroupMessage}>SendGroupMessage</button>
        </div>
    )
}
