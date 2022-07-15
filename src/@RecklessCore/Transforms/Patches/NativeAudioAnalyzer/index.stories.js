import React from 'react';
import 'typeface-roboto-material';

// Import companion elements needed for story.
// import MusicControlsComponent from '../../../MediaPlayers/Widgets/MusicControls';
import TransformManager from '../../Managers/TransformManager';
import DefaultTransformProps from '../../DefaultProps.json';

// Import scene definition with everything but story elements.
import testScene from './index.scene.json';

// Impoer story elements.
import AudioAnalyzer from './index';
import DefaultProps from './DefaultProps.json';

export default {
  title: 'Analyzers/Audio/Native/Patch',
  component: AudioAnalyzer.type,
  argTypes: {
    data: { table: { disable: true }, control: { disable: true } },
  },
};

const Template = (props) => {
  const { connections } = testScene;
  return (
    <TransformManager
      {...props}
      connections={connections}
    >
      <AudioAnalyzer
        {...props}
        connections={connections}
      />
    </TransformManager>
  );
};

Template.propTypes = AudioAnalyzer.propTypes;

export const Default = Template.bind({});
Default.args = {
  ...DefaultTransformProps,
  ...DefaultProps,
  uuid: 'test-audioAnalyzer-1',
  name: 'Audio Analyzer',
};
