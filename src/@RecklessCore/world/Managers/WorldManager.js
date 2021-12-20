import PropTypes from 'prop-types';

import React, { createContext } from 'react';

import { AppContext, appContextValue } from '../../App/Managers/AppManager';
import { ThreeObjectsContext, threeObjectsContextValue } from '../../ThreeObjects/Managers/ThreeObjectsManager';
import { PeersContext, peersContextValue } from '../../Peers/Managers/PeersManager';
import { ConnectionsContext, connectionsContextValue } from '../../Connections/Managers/ConnectionsManager';
import { GeneratorsContext, generatorsContextValue } from '../../Generators/Managers/GeneratorsManager';
import { DevicesContext, devicesContextValue } from '../../Devices/Managers/DevicesManager';
import { TransformsContext, transformsContextValue } from '../../Transforms/Managers/TransformsManager';
import { WidgetsContext, widgetsContextValue } from '../../Widgets/Managers/WidgetsManager';

export const WorldContext = createContext(null);
export const worldContextValue = {};

const WorldManager = ({
  children,
}) => (
  <AppContext.Provider value={appContextValue}>
    <ThreeObjectsContext.Provider value={threeObjectsContextValue}>
      <PeersContext.Provider value={peersContextValue}>
        <ConnectionsContext.Provider value={connectionsContextValue}>
          <GeneratorsContext.Provider value={generatorsContextValue}>
            <DevicesContext.Provider value={devicesContextValue}>
              <TransformsContext.Provider value={transformsContextValue}>
                <WidgetsContext.Provider value={widgetsContextValue}>
                  <WorldContext.Provider value={worldContextValue}>
                    {children}
                  </WorldContext.Provider>
                </WidgetsContext.Provider>
              </TransformsContext.Provider>
            </DevicesContext.Provider>
          </GeneratorsContext.Provider>
        </ConnectionsContext.Provider>
      </PeersContext.Provider>
    </ThreeObjectsContext.Provider>
  </AppContext.Provider>
);

WorldManager.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default WorldManager;
