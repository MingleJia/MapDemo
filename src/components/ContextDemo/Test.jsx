import React, { useState, useEffect } from 'react';
import {getMessages} from './helper';
const {Provider, Consumer} = React.createContext();
// MessageProvider
const testMess = (props) => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState({
        id: 10,
        subject: 'Message-cur-subject',
        text: 'Message-cur',
        body: 'Message-cur-body'
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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
        setCurrentMessage(message)
        this.setState({ currentMessage: message }, () => {console.log('选中项:', this.state.currentMessage)})
    }

    return (
        <Provider value={{
            ...this.state,
            onSelectMessage: selectMessageHandler
        }}>{this.props.children}</Provider>//eslint-disable-line
    )
}
export default testMess;