import React,{useState} from 'react';
import {message} from 'antd';
import {UserConsumer} from './UserContext';
import {login} from './helper';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const inputUserNameChangeHandler = e => {
        setUsername(e.target.value);
    };

    const inputPassWordChangeHandler = e => {
        setPassword(e.target.value);
    };

    const submitHandler = (e, onLogin) => { // eslint-disable-line
        e.preventDefault();
        setError(null);
        setLoading(true);

        // 登录成功时,调用onLogin方法;登录失败时,toast提示
        login(username, password)
            .then(user => {
                setLoading(false);
                onLogin(user);
            }, err => {
                message.warn(err.message)
                setError(err);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    return (
        <UserConsumer>
        {
            ({ onLogin }) => (
                <div>
                    <form onSubmit={e => submitHandler(e, onLogin)}>
                        <div style={{marginBottom: 10}}>
                            用户名：
                            <input
                                name="username"
                                value={username}
                                onChange={(e) => inputUserNameChangeHandler(e)}
                                />
                        </div>
                        <div style={{marginBottom: 10}}>
                            密码：
                            <input
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => inputPassWordChangeHandler(e)}
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

export default Login;
