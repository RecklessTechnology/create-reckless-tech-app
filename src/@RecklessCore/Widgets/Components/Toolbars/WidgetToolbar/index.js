import React from 'react';

import WidgetToolbarView from './view';

const WidgetToolbar = (props) => (
  <WidgetToolbarView {...props} />
);

WidgetToolbar.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default WidgetToolbar;
