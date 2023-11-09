import React, { useState } from 'react';
import i18next from 'i18next';
import Select from '../select/select';
import { useTranslation } from 'react-i18next';

const LanguageSwitch = ({ classList }) => {

  const [language, setLanguage] = useState(i18next.language);
  const { i18n } = useTranslation();

  const changeLanguage = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  const languageOptions = [
    { label: 'UA', value: 'uk-UA' }, 
    { label: 'EN', value: 'en-US' },
    { label: 'RU', value: 'ru-RU' },
  ];

  return (
    <Select 
      classList={'language-switch' + (classList ? ' '+classList : '')}
      name="language-switch"
      data={languageOptions} 
      value={language}
      cleanable={false}
      onChange={changeLanguage} 
    />
  );
};

export default LanguageSwitch;
