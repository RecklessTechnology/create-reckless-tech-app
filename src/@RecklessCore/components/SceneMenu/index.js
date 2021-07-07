import { useMemo, useState, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import useAppContext from '../../contexts/useAppContext';

import SceneList from '../SceneList';
import useThreeObjectsContext from '../../contexts/useThreeObjectsContext';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

const SceneMenu = (props) => {
  const { threeObjectNamesArray } = useThreeObjectsContext();
  const { subscribe } = useAppContext();
  const [ forceListUpdate, setForceListUpdate ] = useState(true);
  
  let [ objects, setObjects ] = useState([]);

  const updateObjects = useCallback(()=>{ //update data only when peer list is modified
    setForceListUpdate(true);
  }, [setForceListUpdate])
  useMemo(()=>subscribe('threeObjects-list-changed', updateObjects), [subscribe, updateObjects]);

  useMemo(()=>{
    if (forceListUpdate) {
      setObjects(threeObjectNamesArray());
      setForceListUpdate(false);
    }
  }, [forceListUpdate, setObjects, threeObjectNamesArray]);

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
}

SceneMenu.whyDidYouRender = true;

export default SceneMenu;
