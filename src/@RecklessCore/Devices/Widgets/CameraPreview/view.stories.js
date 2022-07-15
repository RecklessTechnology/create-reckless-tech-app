import React from 'react';
import 'typeface-roboto-material';

// Import Reckless Tech app framework and chrome.

// Import companion elements needed for story.
import WidgetManager from '../../../Widgets/Managers/WidgetManager';
import DefaultWidgetProps from '../../../Widgets/DefaultProps.json';

// Import scene definition with everything but story elements.
import testScene from './view.scene.json';

// Impoer story elements.
import CameraPreview from './index';
import DefaultProps from './DefaultProps.json';

export default {
  title: 'Widgets/Camera Preview Widget',
  component: CameraPreview.type,
  argTypes: {
    data: { table: { disable: true }, control: { disable: true } },
  },
};

const Template = (props) => {
  const { connections } = testScene;
  return (
    <WidgetManager
      {...props}
      connections={connections}
    >
      <CameraPreview
        {...props}
        connections={connections}
      />
    </WidgetManager>
  );
};

Template.propTypes = CameraPreview.propTypes;

export const Default = Template.bind({});
Default.args = {
  ...DefaultWidgetProps,
  ...DefaultProps,
  uuid: 'test-cameraPreview-1',
  name: 'Camera Preview',
  location: 0,
  size: 0,
};
