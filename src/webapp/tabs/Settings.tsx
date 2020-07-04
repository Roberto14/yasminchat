import React, {useCallback} from 'react';
import useStateWithLocalStorage from "../hooks/useStateWithLocalStorage"
import {
    SETTING_ENTER_ENABLED, SETTING_USER, SETTING_INTERFACE_MODE, SETTING_TIME_FORMAT_24,
    DEFAULT_ENTER_ENABLED, DEFAULT_USER, DEFAULT_INTERFACE_MODE, DEFAULT_TIME_FORMAT_24,
    LIGHT, DARK, ON, OFF,
} from "../../constants";
import BinaryRadioInput from "../components/BinaryRadioInput";
import { useTranslation } from 'react-i18next';
import LocaleSwitcher from "../components/LocaleSwitcher";

const Settings = () => {

    const [user, setUser] = useStateWithLocalStorage(SETTING_USER)
    const [interfaceMode, setInterfaceMode] = useStateWithLocalStorage(SETTING_INTERFACE_MODE)
    const [timeFormat24, setTimeFormat24] = useStateWithLocalStorage(SETTING_TIME_FORMAT_24)
    const [enterEnabled, setEnterEnabled] = useStateWithLocalStorage(SETTING_ENTER_ENABLED)

    const setDefaults = useCallback(() =>{
        setUser(DEFAULT_USER)
        setInterfaceMode(DEFAULT_INTERFACE_MODE)
        setTimeFormat24(DEFAULT_TIME_FORMAT_24)
        setEnterEnabled(DEFAULT_ENTER_ENABLED)
    }, [])

    const { t } = useTranslation() // can load namespace to access more specific set of translations

    return (
        <div>
            <div>
                <p>{t('Username')}</p>
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)}/>
            </div>

            <div>
                <p>{t('Interface Colour')}</p>
                <BinaryRadioInput
                    name="interfaceMode"
                    options={[
                        { text: 'Light', value: LIGHT, selected: interfaceMode === LIGHT},
                        { text: 'Dark', value: DARK, selected: interfaceMode === DARK}
                    ]}
                    onChange={(e) => setInterfaceMode(e.target.value)}
                />
            </div>

            <div>
                <p>{t('Clock Display')}</p>
                <BinaryRadioInput
                    name="clockDisplay"
                    options={[
                        { text: '12 Hours', value: OFF, selected: timeFormat24 === OFF},
                        { text: '24 Hours', value: ON, selected: timeFormat24 === ON}
                    ]}
                    onChange={(e) => setTimeFormat24(e.target.value)}
                />
            </div>


            <div>
                <p>{t('Send Messages on CTRL + ENTER')}</p>
                <BinaryRadioInput
                    name="ctrlEnter"
                    options={[
                        { text: 'On', value: ON, selected: enterEnabled === ON},
                        { text: 'Off', value: OFF, selected: enterEnabled === OFF}
                    ]}
                    onChange={(e) => setEnterEnabled(e.target.value)}
                />
            </div>

            <div>
                <p>{t('Language')}</p>
                <LocaleSwitcher />
            </div>

            <button type="button" onClick={() => setDefaults()}>{t('Reset do Defaults')}</button>

        </div>
    )
}

export default Settings
