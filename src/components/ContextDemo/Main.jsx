import React, { Component} from 'react'
import {UserConsumer} from './UserContext';
import Header from './Header';
import MessageList from './MessageList';
import Message from './Message';
import MessageDetails from './MessageDetails';

export default class Main extends Component {
    state = {list: [1231]}

    addList = (text) => {
        // setState操作的两种方式:https://blog.csdn.net/Mr_28/article/details/84778001
        this.setState((state) => {
            return {
                list: [...state.list, {
                    id: Math.random(),
                    text
                }]
            }
        })
    }

    render() {
        return <UserConsumer>
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
                            <button onClick={() => {this.addList()}}>test-add</button>
                            <div>测试方法</div>
                        </div>
                    )}
                }
            </UserConsumer>
    }
}
