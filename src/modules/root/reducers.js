import * as Actions from "./actions";

// 公用基础reducer
const INITIAL_STATE = {
	test: 'test'
};
const root = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Actions.setTestAction:
			return {
				...state,
				test: action.test,
			};
		default:
			return state;
	}
};

export default root;