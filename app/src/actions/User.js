import _ from "lodash";
import {post} from "../service";
import {init} from "./Websocket";
import {fetchUserChannels} from "./Channels";

export const getUserFromLocalStorage = () => (dispatch, getState) => {

    let user = getState().user;
    // try {
    //
    //     user = JSON.parse(data);
    // }
    // catch (err) {
    //
    //     console.log(err);
    // }


    if (user) {

        // try to connect to backend server and verify this user is exist.
        const token = this.getTokenFromLocalStore();
        const tokenId = _.get(token, '_id');

        const options = {
            headers: {
                authorization: tokenId,
            }
        }
        this.service.get('api/users/me', options).then((response) => {

            // this mean user is logged with this token id.

            const accessToken = response.data;
            const user = _.get(accessToken, 'user');

            this.setCurrentUser(user);
            this.setUserToken(accessToken);

        }).catch(err => {

            this.signOut();

        });

    }
    return user;
}


// signOut() {
//
//     const userId = _.toString(_.get(this.user, '_id', null));
//     const tokenId = _.get(this.token, '_id', null); //this.token._id;
//     // request to backend and loggout this user
//
//     const options = {
//         headers: {
//             authorization: tokenId,
//         }
//     };
//
//     this.service.get('api/me/logout', options);
//
//     this.user = null;
//     localStorage.removeItem('me');
//     localStorage.removeItem('token');
//
//     this.clearCacheData();
//
//     if (userId) {
//         this.users = this.users.remove(userId);
//     }
//
//     this.update();
// }
//
const register = (user) => {

    return new Promise((resolve, reject) => {

        post('api/users', user).then((response) => {

            console.log("use created", response.data);

            return resolve(response.data);
        }).catch(err => {

            return reject("An error create your account");
        })


    });
};

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';

export const userLoginSuccess = (token) => ({
    type: USER_LOGIN_SUCCESS,
    token: token
});

export const login = (email = null, password = null) => dispatch => {

    const userEmail = _.toLower(email);


    const user = {
        email: userEmail,
        password: password,
    };
    //console.log("Ttrying to login with user info", user);


    return new Promise((resolve, reject) => {


        // we call to backend service and login with user data

        post('api/users/login', user).then((response) => {

            // that mean successful user logged in

            const accessToken = _.get(response, 'data');
            dispatch(userLoginSuccess(accessToken));

            dispatch(fetchUserChannels(accessToken._id));
            dispatch(init(accessToken._id));

        }).catch((err) => {

            console.log("Got an error login from server", err);
            // login error

            const message = _.get(err, 'response.data.error.message', "Login Error!");

            return reject(message);
        })

    });


};