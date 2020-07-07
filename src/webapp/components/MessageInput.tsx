import React, { ChangeEvent, KeyboardEvent } from "react";
import {SETTING_ENTER_ENABLED, ON} from "../constants";
import {Button, Textarea, Flex, Box} from 'theme-ui';
import Image from '../assets/paper-plane.svg'

type MessageInputPropsType = {
    onSend: (data: string) => any,
}

type MessageInputStateType = {
    data: string
}

class MessageInput extends React.Component<MessageInputPropsType, MessageInputStateType> {
    constructor(props: MessageInputPropsType) {
        super(props)
        this.state = { data: ''}

        this.onChange = this.onChange.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    // Ideally we would have a Settings provider to provide this setting,
    // since we got a hook we can't use it with class components
    enterEnabled = localStorage.getItem(SETTING_ENTER_ENABLED)

    onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        const { onClick, enterEnabled } = this

        const isEnterPressed = (e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)
        if (isEnterPressed && enterEnabled === ON){
            onClick()
        }
    }

    onChange = (e: ChangeEvent<HTMLTextAreaElement>) => this.setState({ data: e.target.value})

    onClick = () => {
        const { data } = this.state
        const { onSend } = this.props

        // Check we got data to send
        if (data) {
            onSend(data)
            this.setState({ data: ''}) // clean textarea after sending message
        }
    }
    render() {
        const { data: value } = this.state
        const { onChange, onKeyDown, onClick } = this

        return (
            <Flex>
                <Box p={2} sx={{ flex: '1 1 auto' }}>
                    <Textarea placeholder="Write a message..." {...{ value, onChange, onKeyDown}} />
                </Box>
                <Box p={2}>
                    <Button sx={{ width: ['3.7em', '4.5em', '5.7em']}} onClick={onClick} ><Image /></Button>
                </Box>
            </Flex>
        )
    }
}

export default MessageInput
