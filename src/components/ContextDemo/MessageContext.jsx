import React, {useState, useEffect} from 'react';
import {getMessages, getLatestMessages} from './helper';
import {withNotifier} from './NotificationContext'

const {Provider, Consumer} = React.createContext()

const MessageProvider = (props) => {
    const [messages, setmessages] = useState([]);
    const [currentMessage, setcurrentMessage] = useState(null); // eslint-disable-line
    const [error, seterror] = useState(null);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true);
        seterror(null);

        getMessages()
            .then(messages =>{
                setloading(false);
                setmessages(messages)
            })
            .catch(error => {
                setloading(false);
                seterror(error)
            });
        
        setInterval(newMessage, 5000)
    }, []);

    const newMessage = () => {
        console.log('newMessage')
        if (!loading) {
            getLatestMessages()//模拟新消息
                .then(message => {
                    setmessages(messages.concat(message))
                    // notify函数即NotificationProvider中的addMessage函数
                    props.notify(`有一条新消息`)//eslint-disable-line 
                })
        }
    }

    return (
        <Provider value={{
            messages,
            currentMessage,
            error,
            loading,
            onSelectMessage: this.selectMessageHandler
        }}>
            {this.props.children}{/* eslint-disable-line */}
        </Provider>
    )
}

export default MessageProvider;

//MessageProvider作为withNotifier的参数，函数返回的则是带有notify属性也就是把NotificationProvider中的addMessage函数传递到了MessageProvider中
const MessageWithNotifierProvider = withNotifier(MessageProvider)
export { MessageWithNotifierProvider as MessageProvider, Consumer as MessageConsumer }