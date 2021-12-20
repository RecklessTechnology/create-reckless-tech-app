import React from 'react';

import AddToSceneCloseButtonView from './view';

const AddToSceneCloseButton = (props) => (
  <AddToSceneCloseButtonView {...props} />
);

AddToSceneCloseButton.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default AddToSceneCloseButton;
