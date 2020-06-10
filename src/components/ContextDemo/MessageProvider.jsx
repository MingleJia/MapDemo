import React, { useState, useEffect } from 'react';
import {getMessages} from './helper';
const {Provider, Consumer} = React.createContext();
// MessageProvider
const MessageProvider = (props) => {//eslint-disable-line
    const [messages, setMessages] = useState([]);//eslint-disable-line
    const [currentMessage, setCurrentMessage] = useState({//eslint-disable-line
        id: 10,
        subject: 'Message-cur-subject',
        text: 'Message-cur',
        body: 'Message-cur-body'
    });
    const [error, setError] = useState(null);//eslint-disable-line
    const [loading, setLoading] = useState(false);//eslint-disable-line

    useEffect(() => {
        setLoading(true);
        setError(null);
        getMessages()
        .then(messages => {
            setLoading(false);
            setMessages(messages);
        })
        .catch(error => {
            setLoading(false);
            setError(error);
        })
    })

    const selectMessageHandler = (message) => {
        setCurrentMessage(message);
        console.log('点击项:', message);
    }

    return (
        <Provider value={{
            // ...this.state,
            messages,
            currentMessage,
            error,
            loading,
            onSelectMessage: selectMessageHandler
        }}>{props.children}</Provider>//eslint-disable-line
    )
}
export { MessageProvider, Consumer as MessageConsumer }