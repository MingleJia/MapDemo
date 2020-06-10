import React, {useState, useEffect, useRef} from 'react';
import {UserConsumer} from './UserContext';

const Menu = () => {
    const [visible, setVisible] = useState(true);

    const avatarRef = useRef();

    useEffect(() => {
        document.addEventListener('click', hideMenu)
    }, []);

    const hideMenu = e => {
        if (e.target !== avatarRef.current) {
            setVisible(false)
        }
    }

    const toggleMenu = () => {
        setVisible(!visible);
    }

    return (
        <UserConsumer>
        {
            ({ user, onLogout }) => {
                return(
                <div>
                    <img
                        src={user && user.avatar}
                        onClick={toggleMenu}
                        ref={avatarRef}
                    />
                    {visible && (
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

export default Menu;
