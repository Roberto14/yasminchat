import {Container} from "theme-ui";
import React from "react";

export default {
    breakpoints: [
        '768px', '1024px','1200px'
    ],
    fonts: {
        body: 'system-ui, sans-serif',
    },
    fontSizes: [
        12, 14, 16, 20, 24, 32,
    ],
    colors: {
        notifications: '#cc0000',
        messages: '#1a202c',
        text: '#1a202c',
        background: '#fff',
        primary: '#07c',
        modes: {
            dark: {
                notifications: '#2a94e0',
                messages: '#1a202c',
                text: '#fff',
                background: '#1a202c',
                primary: '#ccc',
            }
        }
    },
    layout: {
        body: {
            height: '100vh',
            display: 'grid',
            padding: '0 1em',
        },
        content: {
            p: [0, 0, '0 20%'],
            mt: 2,
        },
    },
    buttons: {
        primary: {
            color: 'background',
            bg: 'primary',
            '&:hover': {
                bg: ['none', 'none', 'text'],
            },
            outline: 0,
            cursor: 'pointer',
        },
    },
    forms: {
        label: {
            fontSize: [1, 2, 2],
            fontWeight: 'bold',
        },
        input: {
            borderColor: 'gray',
            '&:focus': {
                borderColor: 'primary',
            },
            maxWidth: ['100%', "30em"],
            outline: 0,
        },
        select: {
            borderColor: 'gray',
            '&:focus': {
                borderColor: 'primary',
            },
            maxWidth: ['100%', "30em"],
            outline: 0,
        },
        textarea: {
            borderColor: 'gray',
            '&:focus': {
                borderColor: 'primary',
            },
            resize: 'none',
            height: ['4em', '5em'],
            outline: 0,
            fontSize: [0, 0, 2]
        },
    },
    messages: {
        received: {
            color: 'messages',
            float: 'left',
            background: '#efeffe',
        },
        sent: {
            color: 'messages',
            borderRight: 'solid 4px',
            borderRightColor: 'green',
            borderLeft: 'none',
            float: 'right',
            background: '#e4f6e2',
        },
    },
    styles: {
        root: {
            fontFamily: 'body',
            m: 0,
            height: '100%'
        },
    }
}
