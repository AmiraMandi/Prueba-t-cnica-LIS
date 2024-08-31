import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);  
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        
        {i18n.language === 'es' ? (
          <img src="https://flagcdn.com/es.svg" alt="Español" width="24" />
        ) : (
          <img src="https://flagcdn.com/gb.svg" alt="English" width="24" />
        )}
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => changeLanguage('es')}>
          <img src="https://flagcdn.com/es.svg" alt="Español" width="24" style={{ marginRight: 8 }} />
          Español
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('en')}>
          <img src="https://flagcdn.com/gb.svg" alt="English" width="24" style={{ marginRight: 8 }} />
          English
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;
