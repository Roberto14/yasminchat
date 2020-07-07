/** @jsx jsx */
import React, { memo } from "react";
import useStateWithLocalStorage from "../hooks/useStateWithLocalStorage";
import {OFF, SETTING_TIME_FORMAT_24, SETTING_USER} from "../constants";
import { jsx, Message as MessageUI, Box } from 'theme-ui'
// @ts-ignore
import OpengraphReactComponent from 'opengraph-react'

type MessagesListItemPropsType = {
    user: string,
    timestamp: number,
    data: string,
}

const MessagesListItem = ({ user, timestamp, data }: MessagesListItemPropsType) => {
    const [timeFormat24] = useStateWithLocalStorage(SETTING_TIME_FORMAT_24)
    const [currentUser] = useStateWithLocalStorage(SETTING_USER)
    const isMyMessage = user === currentUser
    const is12Time = timeFormat24 === OFF
    const time = new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: is12Time })
    const messageInfo = isMyMessage ? time: `${user}, ${time}`

    const messageUiSx = {
        mt: '1em',
        pt: '4px',
        width: '80%',
    }

    const urlParts = data.match(/(https?:\/\/[^\s]+)/g)
    const link = urlParts && urlParts[0]

    return (
        <Box>
            <MessageUI sx={messageUiSx} variant={isMyMessage ? 'sent' : 'received'}>
                <Box sx={{ fontSize: [0, 0, 1], p: '0.5em 0', opacity: 0.7 }}>{messageInfo}</Box>
                <p sx={{ fontSize: [2, 2, 3], m: 0 }}>{data}</p>
                {link && (
                    <OpengraphReactComponent
                        site={link}
                        appId={process.env.OA_KEY}
                        loader=""
                        size="small"
                    />
                )}
            </MessageUI>
        </Box>
    )
}

export default memo(MessagesListItem)
