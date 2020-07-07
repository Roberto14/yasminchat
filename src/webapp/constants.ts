export const CHANNEL: string = 'message'
export const ON: string = 'ON'
export const OFF: string = 'OFF'
export const LIGHT: string = 'default'
export const DARK: string = 'dark'

// LocalStorage Custom Keys
export const SETTING_USER: string = 'setting_user'
export const SETTING_TIME_FORMAT_24: string = 'setting_time_format_24'
export const SETTING_ENTER_ENABLED: string = 'setting_enter_enabled'

// Default Settings
export const DEFAULT_INTERFACE_MODE: string = LIGHT
export const DEFAULT_TIME_FORMAT_24: string = ON
export const DEFAULT_ENTER_ENABLED: string = OFF
export const DEFAULT_USER_PREFIX: string = 'guest'
export const DEFAULT_USER = `${DEFAULT_USER_PREFIX}${Date.now().toString().substr(-5)}`
export const DEFAULT_LANG: string = `en`
