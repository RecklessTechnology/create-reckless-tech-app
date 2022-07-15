import React from 'react';
import {
  ListItem, MenuItem,
  ListItemText, ListItemSecondaryAction,
  Switch, Slider, Typography,
} from '@material-ui/core';

import Select from '../../Components/Select/view';
import useThemesContext from '../../Themes/Contexts/useThemesContext';

const AppSettings = () => {
  const {
    theme, themes, changeTheme,
    density, densities, changeDensity,
    fontSize, fontSizes, changeFontSize,
    showLabels, changeShowLabels,
  } = useThemesContext();
  return (
    <>
      <ListItem>
        <ListItemText id="app-settings-theme-select-label" primary="Theme" />
        <ListItemSecondaryAction>
          <Select
            id="app-settings-theme-select"
            value={theme}
            onChange={(evt) => { changeTheme(evt.target.value); }}
          >
            {Object.keys(themes).map((name) => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText id="app-settings-density-select-label" primary="Density" />
        <ListItemSecondaryAction>
          <Select
            id="app-settings-density-select"
            value={density}
            onChange={(evt) => { changeDensity(evt.target.value); }}
          >
            {Object.keys(densities).map((name) => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <Typography id="app-settings-fontSize-select-label">Font Size</Typography>
        {/* <ListItemSecondaryAction> */}
        {/* <Select
            id="app-settings-fontSize-select"
            value={fontSize}
            onChange={(evt) => { changeFontSize(evt.target.value); }}
          >
            {Object.keys(fontSizes).map((name) => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))}
          </Select> */}
        <Slider
          value={fontSize}
          onChange={(evt) => { changeFontSize(evt.target.value); }}
          // getAriaValueText={fontSize}
          aria-labelledby="app-settings-fontSize-select-label"
          id="app-settings-fontSize-select"
          step={50}
          valueLabelDisplay="off"
          marks={Object.keys(fontSizes).map((name, idx) => (
            {
              value: idx * 50,
              label: name,
            }))}
        />
        {/* </ListItemSecondaryAction> */}
      </ListItem>
      <ListItem>
        <ListItemText id="app-settings-showLabels-select-label" primary="Show Labels" />
        <ListItemSecondaryAction>
          <Switch
            id="app-settings-showLabels-select"
            checked={showLabels}
            onChange={(evt) => { changeShowLabels(evt.target.checked); }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default AppSettings;
