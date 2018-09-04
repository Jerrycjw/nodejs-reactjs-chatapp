import React from 'react';
import ChannelItem from './ChannelItem';
import { connect } from 'react-redux';

class ChannelFeed extends React.Component {
  render() {
    const { channels } = this.props;
    return (
      <ul className="chat-feed">
        {
            [...channels.keys()].map((key)=> (<ChannelItem key={key} channel={channels.get(key)} />))
        }
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
    channels: state.channels.channels
});

const mapDispatchToProps = (dispatch) => ({
  // fetchChats: () => dispatch(fetchChats())
    dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelFeed);
