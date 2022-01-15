import React from 'react';

import AddToSceneToolbarView from './view';

const AddToSceneToolbar = (props) => (
  <AddToSceneToolbarView {...props} />
);

AddToSceneToolbar.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default AddToSceneToolbar;
