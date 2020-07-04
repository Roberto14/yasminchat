import React from "react";
import {CHAT, SETTINGS} from "../../constants";
import {MessagesConsumer} from "../providers/MessagesProvider";
import {useTranslation} from "react-i18next";

type TabType = typeof CHAT | typeof SETTINGS
type NavigationPropsType = {
    setTab: (tab: TabType) => any,
}

const Navigation = ({ setTab }: NavigationPropsType) => {
    const { t } = useTranslation();

    return (
        <>
            <MessagesConsumer>
                {({ messages, read }) => {
                    const unread = messages.filter((m) => !m.isRead).length

                    return (
                        <>
                            <span>{unread}</span>
                            <button type="button" onClick={()=> setTab(CHAT)}>{t('Chat')}</button>
                        </>
                    )
                }}
            </MessagesConsumer>
            <button type="button" onClick={() => setTab(SETTINGS)}>{t('Settings')}</button>
        </>
    )
}

export default Navigation
