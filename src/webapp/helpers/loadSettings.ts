import * as constants from '../constants';

type KeyMapType = {
  key: string,
  value: string,
};

const defaultKeyMap: KeyMapType[] = [
  { key: constants.SETTING_ENTER_ENABLED, value: constants.DEFAULT_ENTER_ENABLED },
  { key: constants.SETTING_TIME_FORMAT_24, value: constants.DEFAULT_TIME_FORMAT_24 },
  { key: constants.SETTING_USER, value: constants.DEFAULT_USER },
];

export default () => defaultKeyMap.forEach(({ key, value }) => {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, value);
  }
});
