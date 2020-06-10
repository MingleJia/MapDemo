import React from 'react';
import {MessageConsumer, MessageProvider} from './MessageProvider';

const Message = () => {
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
};
export default Message;