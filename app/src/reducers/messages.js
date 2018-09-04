import {OrderedMap} from "immutable";
import {ADD_MESSAGE_TO_CHANNEL, ADD_MESSAGES_TO_MESSAGES, RECEIVE_MESSAGES} from "../actions/Messages";
import _ from "lodash";

const initialState = {};


const addMessage = (messages, payload) => {

    let user = _.get(payload, 'user');

    const messageObject = {
        _id: payload._id,
        body: _.get(payload, 'body', ''),
        userId: _.get(payload, 'userId'),
        channelId: _.get(payload, 'channelId'),
        created: _.get(payload, 'created', new Date()),
        user: user,
    };
    const channelId = messageObject.channelId;

    messages[channelId] = {
        ...messages[channelId],
        [messageObject._id]: messageObject
    };
};

const addMessages = (messages, state) => {
    if (!messages) {
        return state;
    }
    const newMessages = Object.assign({}, state);
    messages.forEach(message => addMessage(newMessages, message, state));
    return newMessages;
};

const messages = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_MESSAGES:
        case ADD_MESSAGES_TO_MESSAGES:
            return addMessages(action.messages, state);
        default:
            return state;
    }
}

export default messages;
