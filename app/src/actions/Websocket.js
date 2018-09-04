import _ from 'lodash'
import {OrderedMap} from 'immutable'
import {websocketUrl} from '../config'
import {receiveMessage} from "./Messages";


// const reconnect = () => {
//
//         window.setInterval(()=>{
//
//             const user = store.getCurrentUser();
//             if(user && !this.isConnected){
//
//                 console.log("try reconnecting...");
//
//                 this.connect();
//             }
//
//         }, 3000)
//     }

const decodeMessage = (msg) => {

        let message = {};

        try {

            message = JSON.parse(msg);

        }
        catch (err) {

            console.log(err);
        }

        return message;
    }

const readMessage = (msg) => dispatch => {
        const message = decodeMessage(msg);

        const action = _.get(message, 'action', '');

        const payload = _.get(message, 'payload');

        switch (action) {

            // case 'user_offline':
            //
            //     this.onUpdateUserStatus(payload, false);
            //     break;
            // case 'user_online':
            //
            //     const isOnline = true;
            //     this.onUpdateUserStatus(payload, isOnline);
            //
            //     break;
            case 'message_added':


                dispatch(receiveMessage(payload));

                break;

            // case 'channel_added':
            //
            //     // to do check payload object and insert new channel to store.
            //     this.onAddChannel(payload);
            //
            //     break;

            default:

                break;
        }


    }

export const send = (msg = {}) => {

        const isConnected = this.isConnected;

        if (this.ws && isConnected) {

            const msgString = JSON.stringify(msg);

            this.ws.send(msgString);
        }

    };

const authentication = (tokenId) => {
    if (tokenId) {

        const message = {
            action: 'auth',
            payload: `${tokenId}`
        };

        send(message);
    }
};


export const init = (tokenId) => dispatch => {

    //console.log("Begin connecting to server via websocket.");

    const ws = new WebSocket(websocketUrl);
    this.ws = ws;


    ws.onopen = () => {


        //console.log("You are connected");

        // let tell to the server who are you ?

        this.isConnected = true;

        authentication(tokenId);


        ws.onmessage = (event) => {

            dispatch(readMessage(_.get(event, 'data')));

            console.log("Mesage from the server: ", event.data);
        }


    }

    ws.onclose = () => {

        //console.log("You disconnected!!!");
        this.isConnected = false;
        //this.store.update();

    }

    ws.onerror = () => {

        this.isConnected = false;
    }

}
