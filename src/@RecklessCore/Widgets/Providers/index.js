import PropTypes from 'prop-types';

import React, { memo } from 'react';

import WidgetsView from './view';

const Widgets = ({ connections, widgets }) => widgets.map((widget) => (
  <WidgetsView
    key={`rt_${widget.type}_widget_${widget.uuid}`}
    connections={connections}
    {...widget}
  />
));

Widgets.whyDidYouRender = (process.env.NODE_ENV === 'development');

Widgets.propTypes = {
  // eslint-disable-next-line react/require-default-props
  sceneJSON: PropTypes.shape({}),
  // eslint-disable-next-line react/require-default-props
  widgets: PropTypes.arrayOf(PropTypes.shape({})),
};

export default memo(Widgets);
