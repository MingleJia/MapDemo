import React, { Component } from 'react';
import styles from './index.scss';
import PropTypes from 'prop-types';
// import axios from 'UTILS/axios';
import { connect } from 'react-redux';
import { setUserInfo } from 'MODULES/root/actions';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    static propTypes = {
        history: PropTypes.object,
        setUserInfo: PropTypes.func,
    }

    componentDidMount() {
        // axios('post', '/api/user/login', {
        //     account: 1111,
        //     password: 1222,
        // }, 'form').then((json) => {
        //     console.log(json);
        //         document.cookie = 'token=' + json.data.userinfo.token;
        // }).catch(() => {
        //     this.setState({ loading: false })
        // })
    }
   
    render() {

        return <div className={styles['box']}>
            1
        </div>
    }
}

export default connect(
    null,
    { setUserInfo }
)(Login)