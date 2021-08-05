import { makeStyles } from '@material-ui/core/styles';

import SceneList from '../SceneList';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const SceneMenu = (props) => {
  // Create local classes
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      role="tabpanel"
      id={`full-width-tabpanel-${1}`}
      aria-labelledby={`full-width-tab-${1}`}
    >
      <SceneList />
    </div>
  );
};

SceneMenu.whyDidYouRender = true;

export default SceneMenu;
