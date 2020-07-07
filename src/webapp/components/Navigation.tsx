/** @jsx jsx */
import React from "react";
import {MessagesConsumer} from "../providers/MessagesProvider";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import { jsx, Button, Text } from 'theme-ui';

const Navigation = () => {
    const { t } = useTranslation()
    const notificationsSxProp = {
        bg: 'notifications',
        borderRadius: 2,
        color: 'white',
        padding: '1px 3px',
        fontSize: 0,
        position: 'absolute' as 'absolute',
        top: 0,
        right: 0,
    }

    return (
            <ul sx={{
                display: 'flex',
                listStyle: 'none',
                mt: 2,
                p: 0,
                bg: 'background',
            }}>
                <li>
                    <MessagesConsumer>
                        {({ messages}) => {
                            const unread: number = messages.filter((m) => !m.isRead).length
                            return (
                                <Link to="/">
                                    <Button sx={{position: 'relative'}}>
                                        {t('Chat')}
                                        {!!unread ? <Text sx={notificationsSxProp}>{unread}</Text> : ''}
                                    </Button>
                                </Link>
                            )
                        }}
                    </MessagesConsumer>
                </li>

                <li sx={{ml: 2}}>
                    <Link to="/settings"><Button>{t('Settings')}</Button></Link>
                </li>
            </ul>
    )
}

export default Navigation
