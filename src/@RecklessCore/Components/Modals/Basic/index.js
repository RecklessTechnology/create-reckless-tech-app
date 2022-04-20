import React, { memo, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Paper, Divider } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';

import ModalToolbar from './Toolbar';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    width: '375px',
  },
}));

const Fade = forwardRef((props, ref) => {
  const {
    in: open, children, onEnter, onExited,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  onEnter: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  onExited: PropTypes.func,
};

const BasicModal = ({
  defaultOpen = false,
  children,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(defaultOpen);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      disableEnforceFocus
      disableAutoFocus
      title="Welcome Model"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper className={classes.root}>
          <ModalToolbar {...{ handleClose }} />
          <Divider />
          {children}
        </Paper>
      </Fade>
    </Modal>
  );
};

BasicModal.propTypes = {
  defaultOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default memo(BasicModal);
