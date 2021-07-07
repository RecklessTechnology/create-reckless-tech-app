import { memo } from 'react'

import { makeStyles } from '@material-ui/styles';

import { IconButton } from "@material-ui/core";

import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const SceneDownloadButttonView = ({ sceneJSON }) => {
  const classes = useStyles();
  return (
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>{
      const link = document.createElement('a');
      link.download = 'RT_Scene.json';
      link.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(sceneJSON))}`;
      link.click();
    }}>
      <GetAppIcon/>
    </IconButton>
  );
}

SceneDownloadButttonView.whyDidYouRender = true;

export default memo(SceneDownloadButttonView);