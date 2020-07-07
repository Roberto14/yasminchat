/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount } from 'enzyme';
// @ts-ignore
import MockedSocket from 'socket.io-mock';
import { MessagesProvider, MessagesConsumer, ContextType } from './MessagesProvider';
import { CHANNEL, SETTING_USER } from '../constants';

describe('Settings Page Component', () => {
  const socket = new MockedSocket();

  // we can skip some type definitions in tests, right? :)
  // this function receives a children callback that will
  // allow us to test a specific behaviour defined in it
  // @ts-ignore
  const getWrapper = (children: (params: ContextType) => any) => mount(
    <MessagesProvider socket={socket.socketClient}>
      <MessagesConsumer>
        {children}
      </MessagesConsumer>
    </MessagesProvider>,
  );

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get updated message list array when socket receives an event', () => {
    const messagesSpy = jest.fn();

    // @ts-ignore
    const children = ({ messages }: ContextType) => {
      messagesSpy(messages);
      return <div />;
    };

    // mount wrapper
    const wrapper = getWrapper(children);

    expect(messagesSpy).toHaveBeenCalledWith([]);

    socket.emit(CHANNEL, { data: 'test' });
    wrapper.update();

    expect(messagesSpy).toHaveBeenCalledWith([{ data: 'test' }]);
  });

  xit('should emit a message when onSend is called', (done) => {
    // @ts-ignore
    const children = ({ onSend }: ContextType) => {
      localStorage.setItem(SETTING_USER, 'testUser');
      onSend('my test');
      return <div />;
    };

    // run wrapper
    getWrapper(children);

    socket.on(CHANNEL, (data: any) => {
      // For some reason mocked socket doesn't get the message, it's a problem in this mocked socket
      // setting a console log on line 52 will output the payload but mocked socket.emit doesnt work
      expect(data.user).toEqual('testUser');
      expect(data.data).toEqual('my test');
      done();
    });
  });

  it('should return all messages as read upon calling this method', () => {
    const messagesSpy = jest.fn();

    // @ts-ignore
    const children = ({ messages, read }: ContextType) => {
      messagesSpy(messages);
      // eslint-disable-next-line jsx-a11y/control-has-associated-label
      return <button type="button" onClick={() => read()} />;
    };

    // mount wrapper
    const wrapper = getWrapper(children);

    // checks no messages exists
    expect(messagesSpy).toHaveBeenCalledWith([]);

    // emits new message
    socket.emit(CHANNEL, { isRead: false });

    // check message is not read
    expect(messagesSpy).toHaveBeenCalledWith([{ isRead: false }]);

    // clicks on the button to read all messages
    wrapper.find('button').simulate('click');

    // checks messages are read
    expect(messagesSpy).toHaveBeenCalledWith([{ isRead: true }]);
  });
});
