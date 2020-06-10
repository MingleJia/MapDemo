import { render } from 'react-dom';
import React from 'react';
import 'STYLES/reset.css';
import App from 'ROUTER/app';
import {UserProvider} from './components/ContextDemo/UserContext';
import {MessageProvider} from './components/ContextDemo/MessageProvider';
import {NotificationProvider} from './components/ContextDemo/NotificationContext';


const mainContent = document.getElementById('main');
render(
    <NotificationProvider>
        <UserProvider>
            <MessageProvider>
                <App />
            </MessageProvider>
        </UserProvider>
    </NotificationProvider>, mainContent);
if (module.hot) {
    module.hot.accept('ROUTER/app', () => {
            render( <App/>, mainContent)
        }
    );
}