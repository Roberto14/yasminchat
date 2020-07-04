import React from "react";

type MessagesListItemPropsType = {
    user: string,
    timestamp: number,
    data: string,
}

const MessagesListItem = ({ user, timestamp, data }: MessagesListItemPropsType) => {
    return (
        <li>
            <p>User: {user}</p>
            <p>Timestamp: {timestamp}</p>
            <p>Message: {data}</p>
        </li>
    )
}

export default MessagesListItem
