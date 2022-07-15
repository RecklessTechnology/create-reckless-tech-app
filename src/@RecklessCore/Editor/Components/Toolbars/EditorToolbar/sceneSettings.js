import React, {
  memo,
} from 'react';

import {
  List, ListItem,
  ListSubheader,
} from '@material-ui/core';

import SceneDownloadButtton from '../../Buttons/SceneDownloadButton';

/**
 * Widget settings (size, location, etc).
 */
const SceneSettings = () => (
  <List>
    <ListSubheader fontSize="small">Upload / Download</ListSubheader>
    <ListItem>
      <SceneDownloadButtton />
    </ListItem>
  </List>
);

SceneSettings.propTypes = {
};

export default memo(SceneSettings);
