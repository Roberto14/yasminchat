import React from "react"
import Chat from './pages/Chat'
import Settings from './pages/Settings'
import { loadSettingsOrDefaults } from './helpers/loadSettings'
import { MessagesProvider } from "./providers/MessagesProvider"
import { HashRouter, Switch, Route } from "react-router-dom"
import { ThemeProvider } from 'theme-ui'
import theme from './theme'
import io from 'socket.io-client'

// App class component loads the essential dependencies we need to make the app work
// It will load: socketio, router, theme-ui provider and MessagesProvider

type AppStateType = {
    loading: boolean,   // we could use this property to show a spinner while the app is not ready
}

class App extends React.Component<{}, AppStateType> {
    state: AppStateType = {
        loading: true,
    }

    socket: null | SocketIOClient.Socket = null

    componentDidMount() {
        // connect to socket io
        this.socket = io('http://localhost:3000')

        // Load localstorage settings or set defaults on first time
        loadSettingsOrDefaults()

        // mutate state to let the page render
        this.setState({ loading: false})
    }

    render() {
        const { loading } = this.state
        const { socket } = this
        return (
            <HashRouter>
                <ThemeProvider theme={theme}>
                    {!loading && socket && (
                        <MessagesProvider socket={socket}>
                            <Switch>
                                <Route path="/settings">
                                    <Settings />
                                </Route>
                                <Route path="/">
                                    <Chat />
                                </Route>
                            </Switch>
                        </MessagesProvider>
                    )}
                </ThemeProvider>
            </HashRouter>
        )
    }
}

export default App
