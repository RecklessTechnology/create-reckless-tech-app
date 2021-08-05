/* eslint-disable import/prefer-default-export */

// Take threejs JSON Object Scene format:
// https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4
// and converts it for use in React Flow
// https://reactflow.dev/docs/

// Default size of patches
const width = 150;
const height = 245;

// Limit depth of parent / child render
const limit = 2;

function dimensionsLookup(type) {
  switch (type) {
    default:
      return [width, height];
    case 'Orbit':
    case 'Sinewave':
      return [width, 100];
  }
}

function typeLookup(props) {
  switch (props.type) {
    default:
      return 'threeObj';
    case 'Scene':
      return props.type;
    case 'Orbit':
    case 'Sinewave':
      return 'generator';
    case 'peer':
      return 'peer';
  }
}

// Build object for React Flow
function makeFlowProps(props, parents, hidden, hideChildren, type) {
  return ({
    type,
    id: `${props.uuid}`,
    data: {
      ...props,
      parents,
      width: dimensionsLookup(type)[0],
      height: dimensionsLookup(type)[1],
      label: props.name,
      isChildHidden: hideChildren,
    },
    isHidden: hidden,
    parents,
    children: [],
  });
}

// Recursive. Traverses 3d scene and makes a patch for each object.
function sceneGraphToFlow(children, parents, level) {
  const nextLevel = level + 1;
  if (children === undefined || children.length === 0) {
    return [];
  }
  return children.map((c) => ([
    {
      ...makeFlowProps(c, parents, (level > limit), (level + 1 > limit), typeLookup(c)),
      children: sceneGraphToFlow(c.children, c.uuid, nextLevel),
    },
    ...sceneGraphToFlow(c.children, [...parents, c.uuid], nextLevel),
  ])).flat();
}

function sceneConnectionsToFlow(children) {
  return children.filter((c) => (!c.isHidden && c.parents.length > 0)).map((c) => ({
    id: `${c.id}-parent-${c.parents[c.parents.length - 1]}-set-children`,
    type: 'customLineage',

    data: {
      ...c,
      label: c.uuid,
    },

    source: `${c.id}`,
    sourceHandle: `${c.id}-parent`,

    target: `${c.parents[c.parents.length - 1]}`,
    targetHandle: `${c.parents[c.parents.length - 1]}-set-children`,

    animated: false,
  }));
}

function connectionsToFlow(rtScene) {
  return rtScene.connections.map((c) => ({
    id: `${c.uuid}_connection`,
    type: 'custom',

    source: `${c.from}`,
    sourceHandle: `${c.from}-${c.fromProp}`,

    target: `${c.to}`,
    targetHandle: `${c.to}-set-${c.toProp}`,

    animated: true,
  }));
}

function generatorsToFlow(rtScene) {
  return rtScene.generators.map((props) => makeFlowProps(props, 'Scene', false, false, 'generator'));
}

function peersToFlow(rtScene) {
  return rtScene.peers.map((props) => makeFlowProps(props, 'Scene', false, false, 'peer'));
}

function devicesToFlow(rtScene) {
  return rtScene.devices.map((props) => makeFlowProps(props, 'Scene', false, false, 'device'));
}

function transformsToFlow(rtScene) {
  return rtScene.transforms.map((props) => makeFlowProps(props, 'Scene', false, false, 'transform'));
}

function rtSceneToFlow(rtScene) {
  return [
    ...peersToFlow(rtScene),
    ...devicesToFlow(rtScene),

    ...generatorsToFlow(rtScene),
    ...transformsToFlow(rtScene),

    ...connectionsToFlow(rtScene),

    // regular three.js scene graph
    ...sceneGraphToFlow([rtScene.object], [], 1),
    ...sceneConnectionsToFlow(sceneGraphToFlow([rtScene.object], [], 1)),

  ];
}

export {
  rtSceneToFlow,
};
