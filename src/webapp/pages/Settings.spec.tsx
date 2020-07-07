import React from 'react'
import { mount } from 'enzyme'
import Settings from "./Settings"
import theme from "../theme";
import {ThemeProvider } from "theme-ui";
import {BrowserRouter} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import useStateWithLocalStorage from "../hooks/useStateWithLocalStorage"
import {
    DEFAULT_ENTER_ENABLED,
    DEFAULT_LANG, DEFAULT_TIME_FORMAT_24,
    DEFAULT_USER,
    SETTING_ENTER_ENABLED,
    SETTING_TIME_FORMAT_24,
    SETTING_USER
} from "../constants";

jest.mock('react-i18next')
jest.mock('../hooks/useStateWithLocalStorage')

describe('Settings Page Component', () => {
    // Note we need to use providers because some hooks use it
    const getWrapper = () => {
        return mount(
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Settings />
                </BrowserRouter>
            </ThemeProvider>
        )
    }

    beforeEach(() => {
        // @ts-ignore
        useTranslation.mockReturnValue({ i18n: { changeLanguage: jest.fn() }, t: jest.fn()})
        // @ts-ignore
        useStateWithLocalStorage.mockReturnValue(['', jest.fn()])
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('matches the snapshot', () => {
        // let's filter out some providers
        const wrapper = getWrapper()
        expect(wrapper.find(Settings)).toMatchSnapshot()
    })

    it('check localStorage hook loads with default values', () => {
        // mount wrapper
        getWrapper()

        expect(useStateWithLocalStorage).toHaveBeenCalledWith(SETTING_USER)
        expect(useStateWithLocalStorage).toHaveBeenCalledWith(SETTING_TIME_FORMAT_24)
        expect(useStateWithLocalStorage).toHaveBeenCalledWith(SETTING_ENTER_ENABLED)
    })

    it('check setDefaults calls hooks handlers to reset the value hook loads with default values', () => {
        // mount wrapper
        const wrapper = getWrapper()
        const { i18n: { changeLanguage } } = useTranslation()
        const [_, setToLocalStorage ] = useStateWithLocalStorage('')

        jest.resetAllMocks()

        const button = wrapper.find('button#reset').simulate('click')
        button.simulate('click')

        wrapper.update()

        expect(setToLocalStorage).toHaveBeenCalledWith(DEFAULT_USER)
        expect(setToLocalStorage).toHaveBeenCalledWith(DEFAULT_ENTER_ENABLED)
        expect(setToLocalStorage).toHaveBeenCalledWith(DEFAULT_TIME_FORMAT_24)
        expect(changeLanguage).toHaveBeenCalledWith(DEFAULT_LANG)
    })
})
