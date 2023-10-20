import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const Language = (props) => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'en');
  const isProfile = props.isProfilePage === true;

  const languageHandler = event => {
    const newLanguage = event.currentTarget.dataset.language;
    if (lang !== newLanguage) {
      setLang(newLanguage);
      i18n.changeLanguage(newLanguage);
    }
  };

  const languageSelectHandler = (event) => {
    const newLanguage = event.target.value;
    if (lang !== newLanguage) {
      setLang(newLanguage);
      i18n.changeLanguage(newLanguage);
    }
  }

  return (
    <>
    { isProfile ?
    (
      <>
      <ListItemButton sx={{ pl: 4 }} onClick={languageHandler} data-language="en" selected={lang === 'en'}>
        <ListItemText primary="English"/>
      </ListItemButton>
      <ListItemButton sx={{ pl: 4 }} onClick={languageHandler} data-language="jp" selected={lang === 'jp'}>
        <ListItemText primary="日本語"/>
      </ListItemButton>
      </>

    ) : (
      <ToggleButtonGroup style={{ position: 'absolute', top: 10, right: 10 }} value={lang} onChange={languageSelectHandler} exclusive>
        <ToggleButton style={{ textTransform: 'capitalize', height: 35 }} value="en">English</ToggleButton>
        <ToggleButton style={{ textTransform: 'capitalize', height: 35 }} value="jp">日本語</ToggleButton>
      </ToggleButtonGroup>
    )}
    </>
  );
};

export default Language;