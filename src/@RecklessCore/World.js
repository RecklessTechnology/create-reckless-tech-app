import React, { createElement } from 'react';
import { Canvas } from '@react-three/fiber';
import { makeStyles } from '@material-ui/core';
import { OrbitControls } from '@react-three/drei';

import { ThreeParamsToArgs } from './utils/threeParams';

export const WorldContext = React.createContext(null);

export default function World({
    children,
    sceneJSON,
    ...props
}) {
    const { object, camera } = sceneJSON;
    const { fog } = object;
    const classes = makeStyles(() => ({
        root: {
            position: 'relative',
            userSelect: 'none',
            width: '100%',
            height: '100%',
        },
    }))();

    const contextValue = {
    };
    return (
        <div className={classes.root}>
            <Canvas
                // mode="concurrent"
                shadows
                camera={camera}
                dpr={window.devicePixelRatio}
                {...props}
            >
                <WorldContext.Provider value={contextValue}>
                    {/* FOG */}
                    {fog !== undefined ? createElement(fog.type, { type: fog.type, attach: "fog", args: ThreeParamsToArgs(fog) }, [] ) : null}
                    {children}
                </WorldContext.Provider>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Canvas>
        </div>
    );
}
