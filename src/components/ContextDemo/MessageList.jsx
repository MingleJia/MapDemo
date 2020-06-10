import React, { Component } from 'react';
import {UserConsumer} from './UserContext';

export default class MessageList extends Component {
    render() {
        return (
            <UserConsumer>
                {
                    ({ user, messages }) => {
                        return (
                        <div>
                            <div>
                                {
                                    messages ? (
                                        messages.map(msg => {
                                            return (<div key={msg.id}>{msg.subject}</div>)
                                        })
                                    ) : `没有邮件, ${user.name}`
                                }
                                
                            </div>
                        </div>
                    )}
                }
            </UserConsumer>
        )
    }
}
