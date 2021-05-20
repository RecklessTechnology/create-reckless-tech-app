import React, { createElement } from 'react';
import { Canvas } from '@react-three/fiber';
import { makeStyles } from '@material-ui/core';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

import { ThreeParamsToArgs } from './utils/threeParams';

export const GameContext = React.createContext(null);

export default function World({
    children,
    sceneProps,
    ...props
}) {
    const { fog } = sceneProps;
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

    const cameraFov = 75;
    const cameraPosition = new THREE.Vector3(0, 5, 5);

    return (
        <div className={classes.root}>
            <Canvas
                shadows
                camera={{ position: cameraPosition, fov: cameraFov }}
                dpr={window.devicePixelRatio}
                {...props}
            >
                <GameContext.Provider value={contextValue}>
                    {/* FOG */}
                    {fog !== undefined ? createElement(fog.type, { type: fog.type, attach: "fog", args: ThreeParamsToArgs(fog) }, [] ) : null}
                    {children}
                </GameContext.Provider>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Canvas>
        </div>
    );
}
