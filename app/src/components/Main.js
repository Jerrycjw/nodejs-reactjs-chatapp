import * as React from "react";
import MessageFeeds from "./messageSection/MessageFeeds";
import MessageTextBox from "./messageSection/MessageTextBox";
import { connect } from 'react-redux'
import {fetchUserChannels} from "../actions/Channels";
import {login} from "../actions/User";
import Sidebar from "./channelBar/Sidebar";

const username = "1234@123.com";
const password = "123";

class Main extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.props.dispatch(login(username, password));
    }

    render() {
        return (
            <div className="main-index">
                <Sidebar/>
                <div className="message-index">
                    <div className="message-index-main-holder">
                        <div className="message-index-main">
                            <MessageFeeds />
                            <MessageTextBox />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProp = state => ({
  token: state.token._id
});

const mapDispatchToProp = dispatch => ({
    dispatch: dispatch,
    fetchUserChannels: dispatch(fetchUserChannels),
});

export default connect(mapStateToProp, mapDispatchToProp)(Main)