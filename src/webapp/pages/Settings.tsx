import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useColorMode, Button, Label, Input, Box, Container,
} from 'theme-ui';
import useStateWithLocalStorage from '../hooks/useStateWithLocalStorage';
import {
  SETTING_ENTER_ENABLED, SETTING_USER, SETTING_TIME_FORMAT_24,
  DEFAULT_ENTER_ENABLED, DEFAULT_USER, DEFAULT_INTERFACE_MODE, DEFAULT_TIME_FORMAT_24,
  LIGHT, DARK, ON, OFF, DEFAULT_LANG,
} from '../constants';
import BinaryRadioInput from '../components/BinaryRadioInput';
import LocaleSwitcher from '../components/LocaleSwitcher';
import Navigation from '../components/Navigation';

const Settings = () => {
  // Load all settings from LocalStorage
  const [user, setUser] = useStateWithLocalStorage(SETTING_USER);
  const [timeFormat24, setTimeFormat24] = useStateWithLocalStorage(SETTING_TIME_FORMAT_24);
  const [enterEnabled, setEnterEnabled] = useStateWithLocalStorage(SETTING_ENTER_ENABLED);
  const [interfaceMode, setInterfaceMode] = useColorMode();
  // can load namespace to access more specific set of translations
  const { i18n, t } = useTranslation();

  // callback function to set all defaults
  // useCallback with no dependencies array, this will keep the same function ref
  // as we dont need to re-defined it
  const setDefaults = useCallback(() => {
    setUser(DEFAULT_USER);
    setInterfaceMode(DEFAULT_INTERFACE_MODE);
    setTimeFormat24(DEFAULT_TIME_FORMAT_24);
    setEnterEnabled(DEFAULT_ENTER_ENABLED);
    i18n.changeLanguage(DEFAULT_LANG);
  }, []);

  const mt = 4; // marginTop for each row

  return (
    <Container variant="body" sx={{ gridTemplateRows: '3em 1fr 3em' }}>
      <Navigation />

      <Container variant="content" sx={{ overflowY: 'scroll' }}>

        <Box>
          <Label>{t('Username')}</Label>
          <Input mb={mt} value={user} onChange={useCallback((e) => setUser(e.target.value), [])} />
        </Box>

        <Box mt={mt}>
          <Label mb={2}>{t('Interface Colour')}</Label>
          <BinaryRadioInput
            name="interfaceMode"
            options={[
              { text: 'Light', value: LIGHT, selected: interfaceMode === LIGHT },
              { text: 'Dark', value: DARK, selected: interfaceMode === DARK },
            ]}
            onChange={useCallback((e) => setInterfaceMode(e.target.value), [])}
          />
        </Box>

        <Box mt={mt}>
          <Label mb={2}>{t('Clock Display')}</Label>
          <BinaryRadioInput
            name="clockDisplay"
            options={[
              { text: '12 Hours', value: OFF, selected: timeFormat24 === OFF },
              { text: '24 Hours', value: ON, selected: timeFormat24 === ON },
            ]}
            onChange={useCallback((e) => setTimeFormat24(e.target.value), [])}
          />
        </Box>

        <Box mt={mt}>
          <Label mb={1}>{t('Send Messages on CTRL + ENTER')}</Label>
          <BinaryRadioInput
            name="ctrlEnter"
            options={[
              { text: 'On', value: ON, selected: enterEnabled === ON },
              { text: 'Off', value: OFF, selected: enterEnabled === OFF },
            ]}
            onChange={useCallback((e) => setEnterEnabled(e.target.value), [])}
          />
        </Box>

        <Box mt={mt}>
          <Label>{t('Language')}</Label>
          <LocaleSwitcher />
        </Box>

      </Container>

      <Container variant="content">
        <Button id="reset" sx={{ width: '100%' }} onClick={setDefaults}>{t('Reset do Defaults')}</Button>
      </Container>

    </Container>
  );
};

export default Settings;
