import React, { Component } from 'react';
import { CHANNEL, SETTING_USER } from '../constants';
import { on, off } from '../helpers/titleNotification';

export type MessageType = {
  user: string
  timestamp: number,
  data: string,
  isRead: boolean,
};

export type ContextType = {
  messages: MessageType[],
  onSend: (data: string) => void,
  read: () => void,
};

type MsgProviderPropsType = {
  socket: SocketIOClient.Socket,
  children: React.ReactNode,
};

type MsgProviderStateType = {
  messages: MessageType[],
};

const defaultValue = {
  messages: [],
  onSend: () => {},
  read: () => {},
};
const MessagesContext = React.createContext<ContextType>(defaultValue);
export const MessagesConsumer = MessagesContext.Consumer;

export class MessagesProvider extends Component<MsgProviderPropsType, MsgProviderStateType> {
  constructor(props: MsgProviderPropsType) {
    super(props);
    this.state = {
      messages: defaultValue.messages,
    };
    this.onSend = this.onSend.bind(this);
    this.read = this.read.bind(this);
  }

  componentDidMount() {
    const { socket } = this.props;

    socket.on(CHANNEL, (newMessage: MessageType) => {
      if (global.document.hidden) {
        on('New Message!');
      }
      this.setState((state) => ({ messages: [...state.messages, newMessage] }));
    });
  }

  onSend(data: string) {
    const { socket } = this.props;
    const user = localStorage.getItem(SETTING_USER);
    const payload = {
      user, timestamp: Date.now(), data, isRead: false,
    };

    socket.emit(CHANNEL, payload);
  }

  read() {
    const { messages } = this.state;
    const unreads = messages.some((m: MessageType) => !m.isRead);
    if (unreads) {
      const readMsgs : MessageType[] = messages.map((m: MessageType) => ({ ...m, isRead: true }));
      this.setState(() => ({ messages: readMsgs }));
    }
    off();
  }

  render() {
    const { children } = this.props;
    const { messages } = this.state;
    const { onSend, read } = this;

    const value = { messages, onSend, read };

    return (
      <MessagesContext.Provider value={value}>
        {children}
      </MessagesContext.Provider>
    );
  }
}
