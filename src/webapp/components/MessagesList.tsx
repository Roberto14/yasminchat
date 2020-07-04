import React, { memo } from "react";
import { MessageType } from "../providers/MessagesProvider";
import MessagesListItem from "./MessagesListItem";

type MessagesListPropsType = {
    messages: MessageType[],
}

const MessagesList = ({ messages }: MessagesListPropsType) => {
    const listItems = messages.map(( { user, timestamp, data }) => {
        const key: string = `${user}${timestamp}`
        return <MessagesListItem key={key} {...{user, timestamp, data }} />
    })

    return <ul>{listItems}</ul>
}

export default memo(MessagesList)
