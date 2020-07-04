import React, { ChangeEvent, KeyboardEvent } from "react";
import {SETTING_ENTER_ENABLED, ON, SETTING_USER} from "../../constants";
import {Trans} from "react-i18next";

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
            <div>
                <textarea name="textbox" placeholder="Write a message..." {...{ value, onChange, onKeyDown}} />
                <button type="button" onClick={onClick}><Trans>Send</Trans></button>
            </div>
        )
    }
}

export default MessageInput
