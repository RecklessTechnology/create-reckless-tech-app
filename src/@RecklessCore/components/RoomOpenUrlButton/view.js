import { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Link, IconButton, Tooltip } from "@material-ui/core";

import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    margin: '0px 27.66px',
  }
}));

const RoomOpenUrlButtonView = ({ url }) => {
  // Create local classes
  const classes = useStyles();

  return (<Link href={url} target="_blank" rel="noopener">
    <Tooltip title="Open URL" aria-label="Open URL">
      <IconButton className={classes.iconButton}>
        <OpenInNewIcon />
      </IconButton>
    </Tooltip>
  </Link>);
}

RoomOpenUrlButtonView.whyDidYouRender = true;

export default memo(RoomOpenUrlButtonView);