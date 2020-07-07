import React from 'react';
import { shallow } from 'enzyme'
import App from './App'
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import socketIOClient from 'socket.io-client'
// @ts-ignore
import MockedSocket from 'socket.io-mock'

jest.mock('socket.io-client')

describe('App Component', ()=>{
    beforeEach(() => {
        // @ts-ignore
        socketIOClient.mockReturnValue(new MockedSocket());
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('matches the snapshot', () => {
        const wrapper = shallow(<App />)
        expect(wrapper).toMatchSnapshot()
    })

    it('checks socket.io has been loaded and called with correct url', () => {
        shallow(<App />) // only needs to run the wrapper
        const url = 'http://localhost:3000'

        expect(socketIOClient.connect).toHaveBeenCalledWith(url);
    })

    // This tests is not entirely needed, snapshot matching is sufficient
    it('should find both Chat and Settings page components', () =>{
        const wrapper = shallow(<App />)

        expect(wrapper.find(Chat)).toHaveLength(1)
        expect(wrapper.find(Settings)).toHaveLength(1)
    })
})
