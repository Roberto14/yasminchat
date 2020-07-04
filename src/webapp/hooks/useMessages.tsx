import React, {Dispatch, SetStateAction, useCallback} from "react"
import { CHANNEL } from "../../constants"

// WARNING: THIS HOOK IS NOT BEING USED
// It's purpose is to demonstrate a analogous hook version of a provider
// To be consumed as `const [ messages, onSend ] = useMessages(socket)`

type MessageType = {
    user: string
    timestamp: number,
    data: string,
}

const initialState = [] as MessageType[]

export default (socket: SocketIOClient.Socket): [MessageType[], any] => {
    const [value, setValue] = React.useState(initialState)

    React.useEffect(() => {
        socket.on(CHANNEL, (newMessage: MessageType) => {
            const messages: MessageType[] = [ ...value, newMessage]
            setValue(messages)
        })
    }, [value])

    const onSend = useCallback((data: MessageType) => {
        socket.emit(CHANNEL, data)
    }, [socket])

    return [value, onSend]
}
