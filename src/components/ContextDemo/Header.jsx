import React, { Component } from 'react'
import {UserConsumer} from './UserContext';
import Menu from './Menu';

const Header = () => {
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
export default Header;
