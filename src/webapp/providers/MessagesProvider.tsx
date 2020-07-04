import React from "react";
import {CHANNEL, SETTING_USER} from "../../constants";

// Analogous version of this provider using Hooks, check ../hooks/useMessages

export type MessageType = {
    user: string
    timestamp: number,
    data: string,
    isRead: boolean,
}

type MessagesProviderPropsType = {
    socket: SocketIOClient.Socket,
    children: React.ReactNode,
}

type MessagesProviderStateType = {
    messages: MessageType[],
}

type ContextType = {
    messages: MessageType[],
    onSend: (data: string) => void,
    read: () => void,
}
const defaultValue = {
    messages: [],
    onSend: () => {},
    read: () => {},
}
const MessagesContext = React.createContext<ContextType>(defaultValue)

export const MessagesConsumer = MessagesContext.Consumer

export class MessagesProvider extends React.PureComponent<MessagesProviderPropsType, MessagesProviderStateType>{
    state = {
        messages: defaultValue.messages
    }

    componentDidMount() {
        const { socket } = this.props

        socket.on(CHANNEL, (newMessage: MessageType) => {
            this.setState((state) => ({ messages: [ ...state.messages, newMessage]}))
        })
    }

    setMessages(newMessages: MessageType[]) {

    }

    onSend(data: string) {
        const { socket } = this.props
        const user = localStorage.getItem(SETTING_USER)
        const payload = { user, timestamp: Date.now(), data, isRead: false }

        socket.emit(CHANNEL, payload)
    }
    read() {
        const { messages } = this.state
        const unreads = messages.some((m: MessageType) => !m.isRead)
        if(unreads) {
            const readMessages: MessageType[] = messages.map((m: MessageType) => ({...m, isRead: true }))
            this.setState((state) => ({ messages: readMessages }))
        }
    }

    render(){
        const { children } = this.props
        const { messages } = this.state

        const value = { messages, onSend: this.onSend.bind(this), read: this.read.bind(this) }

        return (
            <MessagesContext.Provider value={value}>
                {children}
            </MessagesContext.Provider>
        )
    }
}
