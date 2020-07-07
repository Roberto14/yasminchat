import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'theme-ui';
import io from 'socket.io-client';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import loadSettingsOrDefaults from './helpers/loadSettings';
import { MessagesProvider } from './providers/MessagesProvider';
import theme from './theme';

// App class component loads the essential dependencies we need to make the app work
// It will load: socketio, router, theme-ui provider and MessagesProvider
type AppPropsType = {};

type AppStateType = {
  loading: boolean, // we could use this property to show a spinner while the app is not ready
};

class App extends React.Component<AppPropsType, AppStateType> {
  private socket: null | SocketIOClient.Socket = null;

  constructor(props: AppPropsType) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    // connect to socket io
    // Note: This would have to be supplied by Env variable
    this.socket = io(`http://${process.env.HOST}:${process.env.PORT}`);

    // Load localstorage settings or set defaults on first time
    loadSettingsOrDefaults();

    // mutate state to let the page render
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { socket } = this;
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
    );
  }
}

export default App;
