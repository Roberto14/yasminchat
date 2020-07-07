export const CHANNEL = 'message';
export const ON = 'ON';
export const OFF = 'OFF';
export const LIGHT = 'default';
export const DARK = 'dark';

// LocalStorage Custom Keys
export const SETTING_USER = 'setting_user';
export const SETTING_TIME_FORMAT_24 = 'setting_time_format_24';
export const SETTING_ENTER_ENABLED = 'setting_enter_enabled';

// Default Settings
export const DEFAULT_INTERFACE_MODE: string = LIGHT;
export const DEFAULT_TIME_FORMAT_24: string = ON;
export const DEFAULT_ENTER_ENABLED: string = OFF;
export const DEFAULT_USER_PREFIX = 'guest';
export const DEFAULT_USER = `${DEFAULT_USER_PREFIX}${Date.now().toString().substr(-5)}`;
export const DEFAULT_LANG = 'en';
