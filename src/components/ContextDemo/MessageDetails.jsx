import React from 'react';
import {MessageConsumer} from './MessageProvider'

const MessageDetails = () => {
    return (
        <div>
           <MessageConsumer>
               {/* 需要搭配useEffect使用,目前没有使用useEffect,所以无法将变化更新到页面上 */}
            {({ currentMessage, onSelectMessage, messages }) => {
                // console.log('object:', currentMessage);
                return (
                <div>
                    <button onClick={() => onSelectMessage(null)}>Back</button>
                    <h3>{currentMessage && currentMessage.subject}</h3>
                    <div>{currentMessage && currentMessage.body}</div>
                </div>
            )}}
        </MessageConsumer> 
        </div>
    )
}

export default MessageDetails;
