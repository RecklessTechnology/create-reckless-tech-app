// Take threejs JSON Object Scene format:
// https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4
// and converts it for use in React Flow
// https://reactflow.dev/docs/

// Default size of patches
const width = 150;
const height = 245;

// Limit depth of parent / child render
const limit = 3;

function typeLookup(props) {
  switch(props.type) {
    default:
      // console.log(`Patch type '${props.type}' unknown`);
      return 'threeObj';
    case 'Scene':
      return props.type
    case 'Orbit':
    case 'Sinewave':
      return 'generator'
    case 'peer':
      return 'peer'
  }
}

// Build object for React Flow
function makeFlowProps(props, parents, hidden, hideChildren, type) {
  return ({
    type: type,
    id: `${props.uuid}`,
    data: { parents, width, height, label: props.name, isChildHidden: hideChildren, ...props },
    isHidden: hidden,
    parents: parents,
    children: []
  });
}

// Recursive. Traverses 3d scene and makes a patch for each object.
function sceneGraphToFlow(children, parents, level) {
  const nextLevel = level + 1;
  if (children === undefined || children.length === 0) {
    return [];
  } else {
    return children.map((c, idx)=> {
      return ([
        {
          ...makeFlowProps(c, parents, (level > limit), (level + 1 > limit), typeLookup(c)),
          children: sceneGraphToFlow(c.children, c.uuid, nextLevel)
        },
        ...sceneGraphToFlow(c.children, [...parents, c.uuid], nextLevel)
      ]);
    }).flat()
  }
}

function sceneConnectionsToFlow(children) { 
  return children.filter((c)=>(!c.isHidden && c.parents.length > 0)).map((c, idx)=>{
    return {
      id: `${c.id}-parent-${c.parents[c.parents.length - 1]}-children`,
      // type: 'smoothstep',
      
      source: `${c.parents[c.parents.length - 1]}`,
      sourceHandle: `${c.parents[c.parents.length - 1]}-children`,

      target: `${c.id}`,
      targetHandle: `${c.id}-parent`,
      
      animated: false,
    }
  });
}

function connectionsToFlow(rtScene) { 
  return rtScene.connections.map((c, idx)=>{
    return {
      id: `${c.uuid}`,
      // type: 'smoothstep',
      
      source: `${c.from}`,
      sourceHandle: `${c.from}-${c.fromProp}`,

      target: `${c.to}`,
      targetHandle: `${c.to}-set-${c.toProp}`,

      animated: true,
    }
  });
}

function generatorsToFlow(rtScene) {
  return rtScene.generators.map((props, idx) => makeFlowProps(props, 'Scene', false, false, 'generator'));
}

function peersToFlow(rtScene) {
  return rtScene.peers.map((props, idx) => makeFlowProps(props, 'Scene', false, false, 'peers'));
}

function devicesToFlow(rtScene) {
  return rtScene.devices.map((props, idx) => makeFlowProps(props, 'Scene', false, false, 'devices'));
}

function transformsToFlow(rtScene) {
  return rtScene.transforms.map((props, idx) => makeFlowProps(props, 'Scene', false, false, 'transform'));
}

function rtSceneToFlow(rtScene) {
  return [
    // regular three.js scene graph
    ...sceneGraphToFlow([rtScene.object], [], 1),
    ...sceneConnectionsToFlow(sceneGraphToFlow([rtScene.object], [], 1)),

    ...generatorsToFlow(rtScene),
    ...peersToFlow(rtScene),
    ...devicesToFlow(rtScene),
    ...transformsToFlow(rtScene),

    ...connectionsToFlow(rtScene),
  ];
}

export {
  rtSceneToFlow
}