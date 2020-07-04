import React from "react"
import Chat from './tabs/Chat'
import Settings from './tabs/Settings'
import loadJs from "./helpers/loadJs";
import { CHAT, SETTINGS } from "../constants"
import { loadSettingsOrDefaults } from './helpers/loadSettings'
import {MessagesProvider} from "./providers/MessagesProvider"
import Navigation from "./components/Navigation";

type TabType = typeof CHAT | typeof SETTINGS

type AppStateType = {
    loading: boolean,
    tab: TabType,
}

class App extends React.Component<{}, AppStateType> {
    state: AppStateType = {
        loading: true,
        tab: CHAT,
    }

    socket: null | SocketIOClient.Socket = null

    componentDidMount() {
        loadJs('http://localhost:3000/socket.io/socket.io.js').then(() => {
            // open connection and save socket ref
            this.socket = io('http://localhost:3000')
            this.setState({ loading: false})
        })
        // Load localstorage settings or set defaults on first time
        loadSettingsOrDefaults()
    }

    setTab(tab: TabType) {
        this.setState({tab})
    }

    render() {
        const { loading, tab } = this.state
        const { socket } = this
        return (
            <>
                {loading && <span>Loading Application</span>}
                {!loading && socket && (
                    <MessagesProvider socket={socket}>
                        <div>
                            <Navigation setTab={this.setTab.bind(this)} />
                            <div>
                                {tab === CHAT ? <Chat /> : ''}
                                {tab === SETTINGS ? <Settings /> : ''}
                            </div>
                        </div>
                    </MessagesProvider>
                )}
            </>
        )
    }
}

export default App
