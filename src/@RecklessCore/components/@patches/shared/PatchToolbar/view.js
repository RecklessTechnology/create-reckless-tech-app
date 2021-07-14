import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, ButtonGroup, Button, IconButton, Tooltip } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  toolbar: {
    padding: 0,
    minHeight: '48px',
  },
  appbar: {
    background: 'none',
  },
  group: {
    width: '100%'
  },
  button: {
    padding: 14,
    minWidth: '48px',
  },
}));

const PatchToolbarView = ({ parents, uuid, removeThreeObj }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <ButtonGroup variant="text" aria-label="text primary button group" className={classes.group}>
            <Button className={classes.button}>
              {/* <IconButton edge="start" aria-label="clone"> */}
                <Tooltip title="Clone" aria-label="clone">
                  <FileCopyIcon fontSize={"small"} />
                </Tooltip>
              {/* </IconButton> */}
            </Button>
            <Button className={classes.button}>
              {/* <IconButton edge="start" aria-label="clone"> */}
                {/* <Tooltip title="Clone" aria-label="clone">
                  <FileCopyIcon fontSize={"small"} />
                </Tooltip> */}
              {/* </IconButton> */}
            </Button>
            <Button className={classes.button} onClick={()=>{
              removeThreeObj(parents, uuid);
            }}>
              {/* <IconButton edge="start" aria-label="delete"> */}
                <Tooltip title="Delete" aria-label="delete">
                  <DeleteIcon fontSize={"small"} />
                </Tooltip>
              {/* </IconButton> */}
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default memo(PatchToolbarView);