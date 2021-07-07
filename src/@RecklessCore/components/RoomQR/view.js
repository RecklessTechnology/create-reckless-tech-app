import { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import QRCode from 'react-qr-code';

const useStyles = makeStyles((theme) => ({
  qrCode: {
    width: '100%',
    height: '100%',
    display: 'block',
    position: 'relative',
    
  },
}));

const QRView = ({
  size,
  url,
}) => {
  // Create local classes
  const classes = useStyles();

  return (
    <QRCode size={size} className={classes.qrCode} value={url} />
  );
}

QRView.whyDidYouRender = true;

export default memo(QRView);
