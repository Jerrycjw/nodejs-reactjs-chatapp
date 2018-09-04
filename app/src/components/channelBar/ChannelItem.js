import React from 'react';
import { connect } from 'react-redux';
import {switchChannel} from "../../actions/Channels";
import _ from "lodash";

export class ChannelItem extends React.Component {
  constructor(props) {
    super(props);
    this.updateCurrentChat = this.updateCurrentChat.bind(this);
  }

  updateCurrentChat(e) {
    e.preventDefault();
    this.props.switchChannel(this.props.channel._id);
  }

  dateFormat(string) {
    let tt = "am";
    let hh = string.slice(0, 2);
    if (Number(hh) > 12) {
      tt = "pm";
      hh = String(Number(hh)-12);
    } else if (hh[0] === '0') {
      if (hh[1] === '0')
        hh = '12';
      else
        hh = hh[1];
    }
    let mm = string.slice(3, 5);
    if (hh.length > 0) {
      return (`${hh}:${mm}${tt}`);
    } else {
      return "";
    }
  }

  render() {
    const {channel, lastMessage} = this.props;
    let authorDisplay = "";
    let highlightCurrentChat = "";
    let createdAt = _.get(lastMessage, "created", "");
    // if (lastMessage.authorId === this.props.currentUserid) {
    //   authorDisplay = "You: ";
    // } else if (chat.isGroupChat) {
    //   let author;
    //   this.props.users.forEach((user)=>{
    //     if (lastMessage.authorId === user.id) {
    //       author = user;
    //     }
    //   });
    //   authorDisplay = getUserNickname(chatUsers, author.id, chat.id)+ ": ";
    // }
    // if (currentChatId === chat.id) {
    //   highlightCurrentChat = "selected-channel-item";
    // }
    return (
      <li className={`chat-item ${highlightCurrentChat}`}>
        <button className="chat-item-button" onClick={this.updateCurrentChat}>
            <div className="chat-item-button-date-div">
              <h2 className="auth-h2 chat-item-align">{channel.title}</h2>
              <h3>{this.dateFormat(createdAt.slice(11, 19))}</h3>
            </div>
            <h3 className="chat-item-align">{authorDisplay + _.get(lastMessage, "body", "")}</h3>
        </button>
      </li>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
    channel: ownProps.channel,
    // currentChatId: state.currentChatData.id,
    lastMessage: state.messages[ownProps.channel._id] ? state.messages[ownProps.channel._id][Object.keys(state.messages[ownProps.channel._id])[0]] : {},
    // currentUserid: state.session.id,
    // users: Object.values(state.entities.users),
    // chatUsers: Object.values(state.entities.chatUsers)
});

const mapDispatchToProps = (dispatch) => ({
  switchChannel: (id) => dispatch(switchChannel(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelItem);
