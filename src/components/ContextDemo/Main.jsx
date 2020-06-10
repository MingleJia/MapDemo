import React, { useState} from 'react'
import {UserConsumer} from './UserContext';
import Header from './Header';
import MessageList from './MessageList';
import Message from './Message';
import MessageDetails from './MessageDetails';

const Main = () => {
    const [list, setList] = useState([123]);

    const addList = (text) => {
        setList([...list, {
            id: Math.random(),
            text
        }]);
    };

    return (
        <UserConsumer>
            {
                ({onLogout }) =>{
                    return(
                    <div>
                        <Header onLogout={onLogout} />
                        <div style={{marginTop:10, marginBottom:10}}>MessageList是:</div>
                        <MessageList/>
                        <div style={{marginTop:10, marginBottom:10}}>Message是:</div>
                        <Message/>
                        <div style={{marginTop:10, marginBottom:10}}>当前选中的是:</div>
                        <MessageDetails/>
                        <button onClick={addList}>test-add</button>
                        <div>测试方法</div>
                    </div>
                )}
            }
        </UserConsumer>
    );
}

export default Main;
