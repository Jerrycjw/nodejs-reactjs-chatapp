import {
    REQUEST_CHANNELS,
    RECEIVE_CHANNELS,
    requestChannels,
    SWITCH_CHANNEL
} from "../actions/Channels";

import {OrderedMap} from 'immutable'
import _ from "lodash";

const initialState = {
    channels: new OrderedMap(),
    currentChannel: {
    }
};

const receiveChannels = (channelMap, channels) => {
    _.each(channels, (c) => {
        channelMap = addChannel(channelMap, c);
    });
    return channelMap;
};

const addChannel = (channelMap, payload) => {

    const channelId = _.toString(_.get(payload, '_id'));
    const userId = `${payload.userId}`;

    const users = _.get(payload, 'users', []);


    let channel = {
        _id: channelId,
        title: _.get(payload, 'title', ''),
        isNew: false,
        lastMessage: _.get(payload, 'lastMessage'),
        members: new OrderedMap(),
        messages: new OrderedMap(),
        userId: userId,
        created: new Date(),

    };

    // _.each(users, (user) => {
    //
    //     // add this user to store.users collection
    //
    //     const memberId = `${user._id}`;
    //
    //     this.store.addUserToCache(user);
    //
    //     channel.members = channel.members.set(memberId, true);
    //
    //
    // });



    // const channelMessages = store.messages.filter((m) => _.toString(m.channelId)=== channelId);
    //
    // channelMessages.forEach((msg) => {
    //
    //     const msgId = _.toString(_.get(msg, '_id'));
    //     channel.messages = channel.messages.set(msgId, true);
    //
    // });


    return channelMap.set(`${channelId}`, channel);
};


const channels = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CHANNELS:
            return {
                channels: receiveChannels(state.channels, action.channels),
            };
        case REQUEST_CHANNELS:
            return state;
        case SWITCH_CHANNEL:
            return {
                ...state,
                currentChannel: state.channels.get(`${action.channelId}`)
            };
        default:
            return state;
    }
};

export default channels;