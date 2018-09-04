import * as React from "react";
import {addMessage} from "../../actions/Messages";
import {connect} from "react-redux";
import {ObjectID} from "../../helpers/objectid";
import _ from "lodash";


class MessageTextBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {body: ''};
        this.updateHandler = this.updateHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    updateHandler(fieldName) {
        return (
            e => {
                if (this.props.currentChannel) {
                    this.setState({ [fieldName]: e.target.value });
                }
            }
        );
    }

    submitHandler(e) {
        e.preventDefault();
        const messageId = new ObjectID().toString();
        const { currentChannel, currentUser, dispatch } = this.props;
        const channelId = _.get(currentChannel, '_id', null);

        const message = {
            _id: messageId,
            channelId: channelId,
            body: this.state.body,
            userId: _.get(currentUser, '_id'),
            me: true,
        };
        dispatch(addMessage(message));
        this.setState({body: ''});
    }

    render() {
        return (
            <form className="message-text-box" onSubmit={this.submitHandler}>
                <input
                    type="text"
                    className="message-input"
                    onChange={this.updateHandler('body')}
                    placeholder="Type a message..."
                    value={this.state.body}
                    ref = {(input) => {this.messageInput = input; }}>
                </input>
            </form>
        );
    }

}

const mapStateToProps = (state) => ({
    currentChannel: state.channels.currentChannel ? state.channels.currentChannel: null,
    currentUser: state.token
});

const mapDispatchToProps = (dispatch) => ({
    addMessage: dispatch(addMessage),
    dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageTextBox);