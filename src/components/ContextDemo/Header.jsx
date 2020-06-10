import React, { Component } from 'react'
import {UserConsumer} from './UserContext';
import Menu from './Menu';

export default class Header extends Component {
    render() {
        return <UserConsumer>
                {
                    () =>(
                        <div>
                            <h2>我的邮件</h2>
                            <Menu></Menu>
                        </div>
                    )
                }
            </UserConsumer>
    }
}
