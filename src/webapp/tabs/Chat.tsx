import React from 'react'
import MessageInput from "../components/MessageInput"
import MessagesList from "../components/MessagesList"
import { MessagesConsumer } from "../providers/MessagesProvider"

const Chat = () => (
    <MessagesConsumer>
        {({messages, onSend, read }) => {
            // bit hacky but still quick and clean way to avoid MessagesProvider to setState during render
            setTimeout(read)

            return (
                <div>
                    <MessagesList messages={messages} />
                    <MessageInput onSend={onSend} />
                </div>
            )
        }}
    </MessagesConsumer>
)

export default Chat
