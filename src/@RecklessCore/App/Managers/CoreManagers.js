import PropTypes from 'prop-types';
import React from 'react';

import ThreeObjectsManager from '../../ThreeObjects/Managers/ThreeObjectsManager';
import PeersManager from '../../Peers/Managers/PeersManager';
import ConnectionsManager from '../../Connections/Managers/ConnectionsManager';
import DevicesManager from '../../Devices/Managers/DevicesManager';
import MediaPlayersManager from '../../MediaPlayers/Managers/MediaPlayersManager';
import GeneratorsManager from '../../Generators/Managers/GeneratorsManager';
import TransformsManager from '../../Transforms/Managers/TransformsManager';
import WidgetsManager from '../../Widgets/Managers/WidgetsManager';
import EditorMenuManager from '../../Editor/Managers/EditorMenuManager';
import InspectorMenuManager from '../../Inspector/Managers/InspectorMenuManager';

const CoreManagers = ({ children }) => (
  <ThreeObjectsManager>
    <PeersManager>
      <ConnectionsManager>
        <DevicesManager>
          <MediaPlayersManager>
            <GeneratorsManager>
              <TransformsManager>
                <WidgetsManager>
                  <EditorMenuManager>
                    <InspectorMenuManager>
                      {children}
                    </InspectorMenuManager>
                  </EditorMenuManager>
                </WidgetsManager>
              </TransformsManager>
            </GeneratorsManager>
          </MediaPlayersManager>
        </DevicesManager>
      </ConnectionsManager>
    </PeersManager>
  </ThreeObjectsManager>
);

CoreManagers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CoreManagers;
