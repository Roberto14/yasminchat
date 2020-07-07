import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      Username: 'Username',
      'Interface Colour': 'Interface Colour',
      'Clock Display': 'Clock Display',
      'Send Messages on CTRL + ENTER': 'Send Messages on CTRL + ENTER',
      'Reset do Defaults': 'Reset do Defaults',
      Chat: 'Chat',
      Settings: 'Settings',
      Send: 'Send',
    },
  },
  pt: {
    translation: {
      Username: 'Utilizador',
      'Interface Colour': 'Cor da Interface',
      'Clock Display': 'Formato da Hora',
      'Send Messages on CTRL + ENTER': 'Enviar mensagens ao pressionar CTRL + ENTER',
      'Reset do Defaults': 'Restaurar definições',
      Chat: 'Conversa',
      Settings: 'Definições',
      Send: 'Enviar',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    keySeparator: false, // we do not use keys in form messages.welcome
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'PRODUCTION',
  });

export default i18n;
