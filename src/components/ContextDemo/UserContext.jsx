import React from 'react';
import { User, Messages } from './helper'

const { Provider, Consumer } = React.createContext();
class UserProvider extends React.Component {
    state = {
        user: User,
        messages: Messages,
    }

    loginHandler = user => {
        console.log('loginHandler');
        this.setState({ user: user })
    }

    logoutHandler = () => {
        console.log('logoutHandler');
        this.setState({ user: null })
    }

    render() {
        return (
            <Provider value={
                {
                    user: this.state.user,
                    onLogin: this.loginHandler,
                    onLogout: this.logoutHandler,
                    messages: this.state.messages
                }
            }>
               {this.props.children}{/*eslint-disable-line*/}
            </Provider>
        )
    }
}

export { UserProvider, Consumer as UserConsumer }