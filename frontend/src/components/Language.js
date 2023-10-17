import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Language = () => {
  const { i18n } = useTranslation();
  const [dropdownLang, setDropdownLang] = useState(i18n.language || 'en');

  const languageHandler = event => {
    const newLanguage = event.target.value;
    if (dropdownLang !== newLanguage) {
      setDropdownLang(newLanguage);
      i18n.changeLanguage(newLanguage);
    }
  };

  return (
      <ToggleButtonGroup value={dropdownLang} onChange={languageHandler}>
        <ToggleButton value="en">English</ToggleButton>
        <ToggleButton value="it">Italiano</ToggleButton>
        <ToggleButton value="jp">日本語</ToggleButton>
      </ToggleButtonGroup>
  );
};

export default Language;