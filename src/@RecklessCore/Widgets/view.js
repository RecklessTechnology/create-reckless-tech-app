import PropTypes from 'prop-types';

import React, { memo } from 'react';
import useAppContext from '../App/Contexts/useAppContext';

import WidgetManager, { DefaultProps } from './Managers/WidgetManager';

import Preview from './Components/Preview';

const WidgetsView = ({ uuid, type, ...props }) => {
  const { sceneJSON } = useAppContext();
  switch (type.toLowerCase()) {
    default:
    case 'preview':
      return (
        (sceneJSON.connections.filter((c) => (c.to === uuid))[0])
          ? (
            <WidgetManager {...DefaultProps} uuid={uuid} type={type} {...props}>
              <Preview uuid={uuid} type={type} {...props} propName="previewstream" connection={sceneJSON.connections.filter((c) => (c.to === uuid))[0]} />
            </WidgetManager>
          )
          : null
      );
  }
};

WidgetsView.whyDidYouRender = (process.env.NODE_ENV === 'development');

WidgetsView.propTypes = {
  type: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default memo(WidgetsView);
