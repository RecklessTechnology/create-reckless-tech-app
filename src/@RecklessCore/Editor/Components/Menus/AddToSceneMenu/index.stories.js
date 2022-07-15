import React from 'react';

import 'typeface-roboto-material';

import AddToSceneMenu from './index';

import AppManager from '../../../../App/Managers/AppManager';

import LogoScene from '../../../../../scenes/LogoScene.json';
import ThemesManager from '../../../../Themes/Managers/ThemesManager';

export default {
  title: 'Components/Menus/Add to Scene',
  component: AddToSceneMenu.type,
};

const Template = (props, { globals }) => {
  const { theme } = globals;
  return (
    <ThemesManager theme={theme}>
      <AppManager
        scenes={[
          LogoScene,
        ]}
      >
        <AddToSceneMenu {...props} />
      </AppManager>
    </ThemesManager>
  );
};

Template.propTypes = AddToSceneMenu.propTypes;

export const Default = Template.bind({});
Default.args = {};
