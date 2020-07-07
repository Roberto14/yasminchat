import React from 'react';
import { Container } from 'theme-ui';
import MessageInput from '../components/MessageInput';
import MessagesList from '../components/MessagesList';
import { MessagesConsumer } from '../providers/MessagesProvider';
import Navigation from '../components/Navigation';

const Chat = () => (
  <MessagesConsumer>
    {({ messages, onSend, read }) => {
      const gridTemplateRows = ['3em 1fr 5em', '3em 1fr 6em', '3em 1fr 8em'];

      return (
        <Container variant="body" sx={{ gridTemplateRows }}>
          <Navigation />
          <Container variant="content" sx={{ overflowY: 'scroll' }}>
            <MessagesList messages={messages} read={read} />
          </Container>
          <Container variant="content">
            <MessageInput onSend={onSend} />
          </Container>
        </Container>
      );
    }}
  </MessagesConsumer>
);

export default Chat;
