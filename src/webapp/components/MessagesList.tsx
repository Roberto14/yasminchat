/** @jsx jsx */
import React from 'react';
import { jsx, Box } from 'theme-ui';
import { MessageType } from '../providers/MessagesProvider';
import MessagesListItem from './MessagesListItem';

type MessagesListPropsType = {
  messages: MessageType[],
  read: () => any,
};

class MessagesList extends React.Component<MessagesListPropsType, {}> {
  private scrollRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    // get the element via ref and scroll to the targeted element
    const node: HTMLDivElement | null = this.scrollRef.current;
    const { read } = this.props;

    if (node) {
      node.scrollIntoView({ behavior: 'smooth' });
      read();
    }
  };

  render() {
    const { messages } = this.props;
    const listItems = messages.map(({ user, timestamp, data }) => {
      const key = `${user}${timestamp}`;
      return <MessagesListItem key={key} {...{ user, timestamp, data }} />;
    });

    return (
      <Box>
        {listItems}
        <div ref={this.scrollRef} sx={{ clear: 'both' }} />
      </Box>
    );
  }
}

export default MessagesList;
