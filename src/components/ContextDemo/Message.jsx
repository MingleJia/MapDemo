import React, { Component } from 'react';
import {MessageConsumer, MessageProvider} from './MessageProvider';

export default class Message extends Component {
    render() {
        return (
            <div>
                <MessageProvider>
                    <MessageConsumer>
                        {
                            ({messages, onSelectMessage}) => {
                                return messages && messages.map(msg => {
                                    return (
                                        <li key={msg.id} onClick={() => onSelectMessage(msg)}>
                                            {msg.subject}
                                        </li>
                                    );
                                })
                            }
                        }
                    </MessageConsumer>
                </MessageProvider>
            </div>
        )
    }
}


// const Message = ({message, onClick}) => (
//     <li onClick={onClick}>
//         <div>{message.subject}</div>
//     </li>
// );

// const Message = ({ message, onClick }) => (
//     <li onClick={onClick}>
//         <div>{message.subject}</div>
//     </li>
// )