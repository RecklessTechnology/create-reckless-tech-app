import PropTypes from 'prop-types';

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faHome, faQuestion, faMousePointer,
} from '@fortawesome/free-solid-svg-icons';

import {
  AppBar, Toolbar, Tabs, Tab,
} from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';

import InspectorCloseButton from '../../Buttons/InspectorCloseButton';

import IconButtonView from '../../../../Components/IconButton/view';

import useThemesContext from '../../../../Themes/Contexts/useThemesContext';

const useStyles = makeStyles((theme) => ({
  root: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    flexGrow: 0,
    minHeight: 'auto !important',
  },
  tabRoot: {
    minWidth: '50px',
  },
}));

const InspectorToolbarView = ({ value, handleChange }) => {
  const classes = useStyles();
  const { fontSize, showLabels } = useThemesContext();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
        >
          <InspectorCloseButton />
          <div className={classes.spacer} />
          <Tabs
            value={value}
            onChange={(event, newValue) => handleChange(newValue)}
            variant="scrollable"
            indicatorColor="secondary"
            textColor="secondary"
            scrollButtons="off"
            title="Inspect"
          >
            <Tab
              classes={{
                root: classes.tabRoot,
              }}
              label={(
                <IconButtonView
                  {...{
                    label: 'Selection',
                    onClick: () => {
                    // setEditorMenuOpen(!editorMenuOpen);
                    },
                  }}
                  className=""
                  disabled={false}
                  showLabel={showLabels}
                >
                  <FontAwesomeIcon fontSize={fontSize} icon={faMousePointer} />
                </IconButtonView>
              )}
              {...{
                id: 'selection-inspector-tab',
                'aria-controls': 'selection-inspector-tabpanel',
              }}
            />
            <Tab
              classes={{
                root: classes.tabRoot,
              }}
              label={(
                <IconButtonView
                  {...{
                    label: 'Room',
                    onClick: () => {
                    // setEditorMenuOpen(!editorMenuOpen);
                    },
                  }}
                  className=""
                  disabled={false}
                  showLabel={showLabels}
                >
                  <FontAwesomeIcon fontSize={fontSize} icon={faHome} />
                </IconButtonView>
              )}
              {...{
                id: 'room-inspector-tab',
                'aria-controls': 'room-inspector-tabpanel',
              }}
            />
            <Tab
              classes={{
                root: classes.tabRoot,
              }}
              label={(
                <IconButtonView
                  {...{
                    label: 'Peers',
                    onClick: () => {
                    // setEditorMenuOpen(!editorMenuOpen);
                    },
                  }}
                  className=""
                  disabled={false}
                  showLabel={showLabels}
                >
                  <FontAwesomeIcon fontSize={fontSize} icon={faUsers} />
                </IconButtonView>
              )}
              {...{
                id: 'peers-inspector-tab',
                'aria-controls': 'peers-inspector-tabpanel',
              }}
            />
            <Tab
              classes={{
                root: classes.tabRoot,
              }}
              label={(
                <IconButtonView
                  {...{
                    label: 'Settings',
                    onClick: () => {
                    // setEditorMenuOpen(!editorMenuOpen);
                    },
                  }}
                  className=""
                  disabled={false}
                  showLabel={showLabels}
                >
                  <SettingsIcon fontSize={fontSize} />
                </IconButtonView>
              )}
              {...{
                id: 'settings-inspector-tab',
                'aria-controls': 'settings-inspector-tabpanel',
              }}
            />
            <Tab
              classes={{
                root: classes.tabRoot,
              }}
              label={(
                <IconButtonView
                  {...{
                    label: 'Help',
                    onClick: () => {
                    // setEditorMenuOpen(!editorMenuOpen);
                    },
                  }}
                  className=""
                  disabled={false}
                  showLabel={showLabels}
                >
                  <FontAwesomeIcon fontSize={fontSize} icon={faQuestion} />
                </IconButtonView>
              )}
              {...{
                id: 'help-inspector-tab',
                'aria-controls': 'help-inspector-tabpanel',
              }}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

InspectorToolbarView.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default memo(InspectorToolbarView);
