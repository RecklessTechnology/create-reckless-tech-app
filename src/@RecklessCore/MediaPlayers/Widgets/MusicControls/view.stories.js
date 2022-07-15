import React from 'react';
import 'typeface-roboto-material';

// Import companion elements needed for story.
// import MusicControlsComponent from '../../../MediaPlayers/Widgets/MusicControls';
import WidgetManager from '../../../Widgets/Managers/WidgetManager';
import DefaultWidgetProps from '../../../Widgets/DefaultProps.json';

// Import scene definition with everything but story elements.
import testScene from './view.scene.json';

// Impoer story elements.
import MusicControls from './index';
import DefaultProps from './DefaultProps.json';

export default {
  title: 'Widgets/Music Controls Widget',
  component: MusicControls.type,
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
      <MusicControls
        {...props}
        connections={connections}
      />
    </WidgetManager>
  );
};

Template.propTypes = MusicControls.propTypes;

export const Default = Template.bind({});
Default.args = {
  ...DefaultWidgetProps,
  ...DefaultProps,
  uuid: 'test-musicControls-1',
  name: 'Music Controls',
  location: 1,
  size: 1,
};
