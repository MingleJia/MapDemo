export const User = {
    name: 'Mingle',
    username: 'Mingle',
    avatar: 'https://www.gravatar.com/avatar/'
}

//模拟后台登录
export function login(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'Mingle' && password === 'Mingle') {
                resolve(User)
            } else {
                reject({ message: '无效的用户名或密码' })
            }
        }, 2000)
    })
}

export const Messages = [
    {
        id: 0,
        subject: 'Message1',
        text: 'Message1',
        body: 'Message1'
    },
    {
        id: 1,
        subject: 'Message2',
        text: 'Message2',
        body: 'Message2'
    },
    {
        id: 2,
        subject: 'Message3',
        text: 'Message3',
        body: 'Message3'
    }
]

export function getMessages() {
    return new Promise((resolve, reject) => { // eslint-disable-line
        setTimeout(() => {
            resolve(Messages)
        }, 1000);
    })
}

// 模拟新消息
export function getLatestMessages() {
    return new Promise((resolve, reject) => {// eslint-disable-line
        setTimeout(() => {
            resolve(
                Messages.map(msg => ({
                    ...msg,
                    id: Math.random()
                })).slice(
                    0,
                    1
                )//用slice来获取一个只含有一条信息的数组
            );
        }, 1000);
    });
}