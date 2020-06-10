import React from 'react';
import {getMessages, getLatestMessages} from './helper';
import {withNotifier} from './NotificationContext'

const {Provider, Consumer} = React.createContext()

class MessageProvider extends React.Component {
    state = {
        messages: [],
        currentMessage: null,
        error: null,
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true, error: null })
        getMessages()
            .then(messages => this.setState({ loading: false, messages }))
            .catch(error => this.setState({ loading: false, error }))
        this.newMessageInterval = setInterval(this.newMessage, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.newMessage)
    }

    selectMessageHandler = (message) => {
        console.log('context-message:', message);
        this.setState({ currentMessage: message })
    }

    newMessage = () => {
        console.log('newMessage')
        if (!this.state.loading) {
            getLatestMessages()//模拟新消息
                .then(message => {
                    this.setState(state => ({ messages: state.messages.concat(message) }))
                    // notify函数即NotificationProvider中的addMessage函数
                    this.props.notify(`有一条新消息`)//eslint-disable-line 
                })
        }
    }

    render() {
        return (
            <Provider value={{
                ...this.state,
                onSelectMessage: this.selectMessageHandler
            }}>
                {this.props.children}{/* eslint-disable-line */}
            </Provider>
        )
    }
}

//MessageProvider作为withNotifier的参数，函数返回的则是带有notify属性也就是把NotificationProvider中的addMessage函数传递到了MessageProvider中
const MessageWithNotifierProvider = withNotifier(MessageProvider)
export { MessageWithNotifierProvider as MessageProvider, Consumer as MessageConsumer }