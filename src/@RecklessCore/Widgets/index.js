import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/styles';

import useAppContext from '../App/Contexts/useAppContext';

import WidgetsView from './view';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    zIndex: 1,
    pointerEvents: 'none',
    width: (props) => (
      `calc(100% - ${(props.inspectorMenuOpen ? props.inspectorMenuWidth : 0)}px)`
    ),
    height: '100%',
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));
const Widgets = ({
  editorMenuOpen,
  editorMenuHeight,
  inspectorMenuOpen,
  inspectorMenuWidth,
}) => {
  const { sceneJSON } = useAppContext();
  const { widgets } = sceneJSON;
  // Local CSS classes
  const classes = useStyles({
    editorMenuOpen,
    editorMenuHeight,
    inspectorMenuOpen,
    inspectorMenuWidth,
  });
  return (
    <div
      className={classes.root}
      onClick={(e) => { e.preventDefault(); }}
      aria-hidden="true"
    >
      {widgets.map((widget) => (
        <WidgetsView key={`rt_${widget.type}_device_${widget.uuid}`} {...widget} />
      ))}
    </div>
  );
};

Widgets.whyDidYouRender = (process.env.NODE_ENV === 'development');

Widgets.propTypes = {
  editorMenuOpen: PropTypes.bool.isRequired,
  editorMenuHeight: PropTypes.number.isRequired,
  inspectorMenuOpen: PropTypes.bool.isRequired,
  inspectorMenuWidth: PropTypes.number.isRequired,
};

export default memo(Widgets);
