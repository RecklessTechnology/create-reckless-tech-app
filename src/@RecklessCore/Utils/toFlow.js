// Take threejs JSON Object Scene format:
// https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4
// and converts it for use in React Flow
// https://reactflow.dev/docs/

// Default size of patches
const width = 150;
const height = 245;

// Limit depth of parent / child render
const limit = 2;

const dimensionsLookup = (type) => {
  switch (type.toLowerCase()) {
    default:
      return [width, height];
    case 'orbit':
    case 'sinewave':
      return [width, 100];
  }
};

const typeLookup = (props) => {
  switch (props.type.toLowerCase()) {
    default:
      return 'threeObj';
    case 'scene':
      return props.type;
    case 'orbit':
    case 'sinewave':
      return 'generator';
    case 'peer':
      return 'peer';
  }
};

// Build object for React Flow
const makeFlowProps = (props, parents, hidden, hideChildren, type) => ({
  type,
  id: `${props.uuid}`,
  data: {
    children: [],
    ...props,
    parents,
    width: dimensionsLookup(type)[0],
    height: dimensionsLookup(type)[1],
    label: props.name,
    isChildHidden: hideChildren,
    isPatchHidden: (props.userData !== undefined) ? props.userData.isPatchHidden : false,
  },
  isHidden: (props.userData !== undefined) ? props.userData.isPatchHidden : false,
  parents,
  children: [],
});

// Recursive. Traverses 3d scene and makes a patch for each object.
const sceneGraphToFlow = (children, parents, level) => {
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
};

const sceneConnectionsToFlow = (children) => children
  .filter((c) => (!c.isHidden && c.parents.length > 0)).map((c) => ({
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

const connectionsToFlow = (connections) => connections.map((c) => ({
  id: `${c.uuid}`,
  type: 'custom',

  source: `${c.from}`,
  sourceHandle: `${c.from}-${c.fromProp}`,

  target: `${c.to}`,
  targetHandle: `${c.to}-set-${c.toProp}`,

  animated: true,
}));

const generatorsToFlow = (generators) => generators.map((props) => makeFlowProps(props, 'scene', false, false, 'generator'));

const peersToFlow = (peers) => peers.map((props) => makeFlowProps(props, 'scene', false, false, 'peer'));

const devicesToFlow = (devices) => devices.map((props) => makeFlowProps(props, 'scene', false, false, 'device'));

const widgetsToFlow = (widgets) => widgets.map((props) => makeFlowProps(props, 'scene', false, false, 'widget'));

const transformsToFlow = (transforms) => transforms.map((props) => makeFlowProps(props, 'scene', false, false, 'transform'));

const rtSceneToFlow = (rtScene) => [
  ...widgetsToFlow(rtScene.widgets),

  ...peersToFlow(rtScene.peers),
  ...devicesToFlow(rtScene.devices),

  ...generatorsToFlow(rtScene.generators),
  ...transformsToFlow(rtScene.transforms),

  ...connectionsToFlow(rtScene.connections),

  // regular three.js scene graph
  ...sceneGraphToFlow([rtScene.object], [], 1),
  ...sceneConnectionsToFlow(sceneGraphToFlow([rtScene.object], [], 1)),

];

export {
  // eslint-disable-next-line import/prefer-default-export
  rtSceneToFlow,
  sceneGraphToFlow,
  devicesToFlow,
  widgetsToFlow,
  peersToFlow,
  generatorsToFlow,
  transformsToFlow,
  connectionsToFlow,
};
