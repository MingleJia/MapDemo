import React from 'react';

const {Provider, Consumer} = React.createContext();

class NotificationProvider extends React.Component {
    state={
        messages: [
            {
                id: 55,
                subject: 'Message-test',
                text: 'Message-test',
                body: 'Message-test'
            }
        ], //存储消息对象
    }

    addMessage = (text) => {
        this.setState(state => ({
            messages: [
                ...state.messages,
                {
                    id: Math.random(),
                    text
                }
            ]
        }))
    }

    removeMessage = message => {
        this.setState(state => ({
            messages: state.messages.filter(msg => (
                msg.id !== message.id
            ))
        }))
    }

    render() {
        return (
            <Provider value={{
                ...this.state,
                notify: this.addMessage
            }}>
                <div className="notification-wrapper">
                    <div>5454545454554545454</div>
                    <ul>
                        {this.state.messages.map(message => (
                            <Notification
                                key={message.id}
                                message={message}
                                onClose={() => this.removeMessage(message)}
                            >
                            </Notification>
                        ))}
                    </ul>
                    {this.props.children} {/* eslint-disable-line */} 
                </div>
            </Provider>
        )
    }
}

const Notification = ({ message, onClose }) => (//eslint-disable-line
    <li>
        {message.text}
        <button className="close" onClick={onClose}>关闭</button>
    </li>
);

// notify函数是以属性的方式传递给MessageProvider组件的。但没有用NotificationConsumer来传递函数给MessageProvider，而是使用高阶组件的方式
function withNotifier(Component) {
    return function Notified(props) {
        return (
            <Consumer>
                {
                    ({ notify }) => (
                        <Component {...props} notify={notify} />
                    )
                }
            </Consumer>
        )
    }
}

export { NotificationProvider, Consumer as NotificationConsumer, withNotifier }
