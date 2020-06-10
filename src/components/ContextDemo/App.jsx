import React, { Component } from 'react';
import {UserProvider, UserConsumer} from './UserContext';
import Main from './Main.jsx';
import Login from './Login.jsx';

// 入口文件 通过context.Consumer获取到user信息,有信息---显示主页Main,否则,登录页
export default class App extends Component {
    render() {
        return <UserProvider>
            <UserConsumer>
                {
                    ({user}) => {
                        return user ? <Main/> : <Login/>
                    }
                }
            </UserConsumer>
        </UserProvider>
    }
}
