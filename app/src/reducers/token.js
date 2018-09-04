import {USER_LOGIN_SUCCESS} from "../actions/User";


const token = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return action.token;
        default:
            return state;
    }
};

export default token;