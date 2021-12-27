import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';

import WelcomeModalView from './view';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Fade = React.forwardRef((props, ref) => {
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

const WelcomeModal = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      disableEnforceFocus
      disableAutoFocus
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
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
        <WelcomeModalView {...{ handleClose }} />
      </Fade>
    </Modal>
  );
};

export default WelcomeModal;
