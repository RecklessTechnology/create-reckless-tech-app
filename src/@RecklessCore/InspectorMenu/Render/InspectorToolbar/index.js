import React from 'react';

import InspectorToolbarView from './view';

const InspectorToolbar = (props) => (
  <InspectorToolbarView {...props} />
);

InspectorToolbar.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default InspectorToolbar;
