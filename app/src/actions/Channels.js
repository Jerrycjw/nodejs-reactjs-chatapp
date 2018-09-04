import _ from "lodash";
import {fetchChannelMessages} from "./Messages";
import {get, post} from "../service";

export const REQUEST_CHANNELS = 'REQUEST_CHANNELS';
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const SWITCH_CHANNEL = 'SWICH_CHANNEL';
export const requestChannels = () => ({
    type: REQUEST_CHANNELS,
});

export const receiveChannels = (channels) => ({
    type: RECEIVE_CHANNELS,
    channels: channels
});

export const switchChannel = (channelId) => ({
    type: SWITCH_CHANNEL,
    channelId: channelId
});

export const fetchUserChannels = () => (dispatch, getState) => {
    const tokenId = getState().token._id;

    if (tokenId) {

        requestChannels(tokenId);

        const options = {
            headers: {
                authorization: tokenId,
            }
        };

        get(`api/me/channels`, options).then((response) => {

            const channels = response.data;

            dispatch(receiveChannels(channels));

            const firstChannelId = _.get(channels, '[0]._id', null);

            dispatch(fetchChannelMessages(firstChannelId));

            dispatch(switchChannel(firstChannelId));

        }).catch((err) => {

            console.log("An error fetching user channels", err);
        })
    }
}


// export const removeMemberFromChannel = (channel = null, user = null) => dispatch => {
//
//         if (!channel || !user) {
//             return;
//         }
//
//         const userId = _.get(user, '_id');
//         const channelId = _.get(channel, '_id');
//
//         channel.members = channel.members.remove(userId);
//
//         this.channels = this.channels.set(channelId, channel);
//
//         this.update();
//
//     };

//     addUserToChannel(channelId, userId) {
//
//
//         const channel = this.channels.get(channelId);
//
//         if (channel) {
//
//             // now add this member id to channels members.
//             channel.members = channel.members.set(userId, true);
//             this.channels = this.channels.set(channelId, channel);
//             this.update();
//         }
//
//     }
// };
//
// addChannel(index, channel = {}) {
//     this.channels = this.channels.set(`${index}`, channel);
//
//     this.update();
// }



