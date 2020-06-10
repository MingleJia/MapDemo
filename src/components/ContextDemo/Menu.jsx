import React from 'react';
import {UserConsumer} from './UserContext';

export default class Menu extends React.Component {
    state = {
        visible: true
    }

    avatarRef = React.createRef()

    componentDidMount() {
        document.addEventListener('click', this.hideMenu)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.hideMenu)
    }

    hideMenu = e => {
        if (e.target !== this.avatarRef.current) {
            this.setState({ visible: false })
        }
    }

    toggleMenu = () => {
        this.setState(state => ({ visible: !state.visible }))
    }

    render() {
        return (
            <UserConsumer>
            {
                ({ user, onLogout }) => {
                    return(
                    <div>
                        <img
                            src={user && user.avatar}
                            onClick={this.toggleMenu}
                            ref={this.avatarRef}
                        />
                        {this.state.visible && (
                            <ul>
                                <li onClick={onLogout}>退出登录</li>
                            </ul>
                        )}
                    </div>
                )}
            }
        </UserConsumer>
        )
    }
}
