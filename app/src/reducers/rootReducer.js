import { combineReducers } from 'redux';
import channels from "./channels";
import messages from "./messages";
import token from "./token";

const rootReducer = combineReducers({
    channels: channels,
    messages: messages,
    token: token
});

export default rootReducer;