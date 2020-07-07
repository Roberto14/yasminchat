import React, { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'theme-ui';

const LocaleSwitcher = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const changeLanguage = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  }, [language]);

  return (
    <Select value={language} onChange={changeLanguage}>
      <option value="en">{t('English')}</option>
      <option value="pt">{t('Portuguese')}</option>
    </Select>
  );
};

export default LocaleSwitcher;
