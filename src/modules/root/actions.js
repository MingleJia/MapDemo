export const setTestAction = 'setTestAction';	   // 用户信息(通过登录成功后获取)
export const userInfo = 'userInfo';	   // 用户信息(通过登录成功后获取)
function action(type, info = {}) {
	return { type, ...info };
}

export const setTest = (info) => action(setTestAction, info);
export const setUserInfo = (info) => action(userInfo, info);