import * as React from "react";
import MessageItem from "./MessageItem";
import {fetchChannelMessages} from "../../actions/Messages";
import { connect } from 'react-redux';
import {fetchUserChannels} from "../../actions/Channels";

class MessageFeeds extends React.Component {
    constructor(props) {
        super(props);
        // web socket connection here.
    }

    componentDidUpdate() {
        this.props.fetchChannelMessages(this.props.currentChannelId);
    }

    render() {
        const messages = this.props.messages;
        return (
            <div className="message-feed-div">
                <ul className="message-feed">
                    {
                        messages
                            ? Object.keys(messages).sort().map(id => <MessageItem key={id} message={messages[id]}/>)
                            : null
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state, {}) => ({
    messages: state.channels.currentChannel ? state.messages[`${state.channels.currentChannel._id}`] : {},
    currentChannelId: state.channels.currentChannel ? state.channels.currentChannel._id : 1
});

const mapDispatchToProps = (dispatch) => ({
    fetchChannelMessages: (channelId) => dispatch(fetchChannelMessages(channelId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageFeeds)