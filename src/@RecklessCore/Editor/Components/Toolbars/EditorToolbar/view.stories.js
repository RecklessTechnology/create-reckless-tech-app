/* eslint-disable no-console */
import React, { useState } from 'react';

import 'typeface-roboto-material';

import EditorToolbarView from './view';
import AppManager from '../../../../App/Managers/AppManager';
import EditorMenuManager from '../../../Managers/EditorMenuManager';

import LogoScene from '../../../../../scenes/LogoScene.json';
import ThemesManager from '../../../../Themes/Managers/ThemesManager';

export default {
  title: 'Components/Toolbars/Editor Toolbar',
  component: EditorToolbarView.type,
};

const Template = (props, { globals }) => {
  const { activeScene } = props;
  const { theme } = globals;

  // eslint-disable-next-line no-unused-vars
  const [active, setActive] = useState(activeScene);
  return (
    <ThemesManager theme={theme}>
      <AppManager
        scenes={[
          LogoScene,
        ]}
      >
        <EditorMenuManager>
          <EditorToolbarView
            activeScene={active}
            onSetActiveScene={(val) => { console.log(val); }}
            {...props}
          />
        </EditorMenuManager>
      </AppManager>
    </ThemesManager>
  );
};

Template.propTypes = EditorToolbarView.propTypes;

export const Scene1 = Template.bind({});
Scene1.args = {

  sceneNames: [
    {
      name: 'Scene 1',
      uuid: '1',
    },
    {
      name: 'Scene 2',
      uuid: '2',
    },
  ],
  activeScene: '1',
  setActiveScene: () => {},
};

export const Scene2 = Template.bind({});
Scene2.args = {

  sceneNames: [
    {
      name: 'Scene 1',
      uuid: '1',
    },
    {
      name: 'Scene 2',
      uuid: '2',
    },
  ],
  activeScene: '2',
  setActiveScene: () => {},
};
