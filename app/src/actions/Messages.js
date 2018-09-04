import _ from "lodash";
import {fetchUserChannels, requestChannels} from "./Channels";
import {get} from "../service";

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';

export const receiveMessage = (json) => ({
    type: RECEIVE_MESSAGES,
    messages: json.data
});

export const ADD_MESSAGES_TO_MESSAGES = 'ADD_MESSAGES_TO_MESSAGES';
export const addMessagesToMessages = (messages) => ({
    type: ADD_MESSAGES_TO_MESSAGES,
    messages: messages,
});

export const ADD_MESSAGE_TO_CHANNEL = 'ADD_MESSAGE_TO_CHANNEL';
export const addMessageToChannel = (message) => ({
    type: ADD_MESSAGE_TO_CHANNEL,
    messages: message
});


export const fetchChannelMessages = channelId => (dispatch, getState) => {


    // const channel = getState().channels.get(channelId);
    const { token } = getState();
    const tokenId = token._id;

    // if (channel && !_.get(channel, 'isFetchedMessages')){
    const options = {
        headers: {
            authorization: tokenId,
        },
        params: {
            filter: {
                limit: 1000
            }
        }
    };

    get(`api/channels/${channelId}/messages`, options).then((response) => {
        dispatch(receiveMessage(response));

    }).catch((err) => {

        console.log("An error fetching channel 's messages", err);
    })
};

export const addMessage = (message = {}) => (dispatch, getState, {send}) => {

    // let's add new message id to current channel->messages.

    const channelId = _.get(message, 'channelId');
    if (channelId) {
        send(
            {
                action: 'create_message',
                payload: message,
            }
        );
        dispatch(addMessagesToMessages([message]));
    }

};