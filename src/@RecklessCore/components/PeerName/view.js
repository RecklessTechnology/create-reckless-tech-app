import { memo } from 'react';

import { makeStyles } from '@material-ui/styles';

import { ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  multiline: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }
}));

const PeerNameView = ({ primary, secondary }) => {
  const classes = useStyles();
  return (
    <ListItemText
        classes={{
          multiline: classes.multiline
        }}
        primary={primary}
        secondary={secondary}></ListItemText>
  );  
}

PeerNameView.whyDidYouRender = true;

export default memo(PeerNameView);