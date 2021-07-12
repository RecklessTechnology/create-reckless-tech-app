import { createContext } from 'react';

import { AppContext, appContextValue } from './AppManager';
import { ThreeObjectsContext, threeObjectsContextValue } from './ThreeObjectsManager';
import { PeersContext, peersContextValue } from './PeersManager';
import { ConnectionsContext, connectionsContextValue } from './ConnectionsManager';
import { GeneratorsContext, generatorsContextValue } from './GeneratorsManager';
import { DevicesContext, devicesContextValue } from './DevicesManager';
import { TransformsContext, transformsContextValue } from './TransformsManager';

export const WorldContext = createContext(null);

const WorldManager = ({
    children,
    ...props
}) => {
    const worldContextValue = {
    };

    return (
        <AppContext.Provider value={appContextValue}>
            <ThreeObjectsContext.Provider value={threeObjectsContextValue}>
                <PeersContext.Provider value={peersContextValue}>
                    <ConnectionsContext.Provider value={connectionsContextValue}>
                        <GeneratorsContext.Provider value={generatorsContextValue}>
                            <DevicesContext.Provider value={devicesContextValue}>
                              <TransformsContext.Provider value={transformsContextValue}>
                                <WorldContext.Provider value={worldContextValue}>
                                    {children}
                                </WorldContext.Provider>
                              </TransformsContext.Provider>
                            </DevicesContext.Provider>
                        </GeneratorsContext.Provider>
                    </ConnectionsContext.Provider>
                </PeersContext.Provider>
            </ThreeObjectsContext.Provider>
        </AppContext.Provider>
    );
}

export default WorldManager;