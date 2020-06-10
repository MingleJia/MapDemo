import React from 'react';
import {message} from 'antd';
import {UserConsumer} from './UserContext';
import {login} from './helper';

export default class Login extends React.Component {
    state = {
        username: '',
        password: '',
        error: null,
        loading: false
    };

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitHandler = (e, onLogin) => { // eslint-disable-line
        e.preventDefault();
        this.setState({ loading: true, error: null });

        // 登录成功时,调用onLogin方法;登录失败时,toast提示
        login(this.state.username, this.state.password)
            .then(user => {
                this.setState({ loading: false });
                onLogin(user);
            }, err => {
                message.warn(err.message)
                this.setState({ err, loading: false })
            })
            .catch(error => {
                this.setState({ error, loading: false })
            });
    };

    render() {
        const { username, password, error, loading } = this.state;

        return (
            <UserConsumer>
            {
                ({ onLogin }) => (
                    <div>
                        <form onSubmit={e => this.submitHandler(e, onLogin)}>
                            <div style={{marginBottom: 10}}>
                                用户名：
                                <input
                                    name="username"
                                    value={username}
                                    onChange={(e) => this.inputChangeHandler(e)}
                                    />
                            </div>
                            <div style={{marginBottom: 10}}>
                                密码：
                                <input
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => this.inputChangeHandler(e)}
                                    />
                            </div>
                            {error && <div>{error.message}</div>}
                            <button type="submit" disabled={loading}>登录</button>
                        </form>
                    </div>
                )
            }
        </UserConsumer>
        );
    }
}
