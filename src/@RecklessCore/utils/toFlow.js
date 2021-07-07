// Take threejs JSON Object Scene format:
// https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4
// and converts it for use in React Flow
// https://reactflow.dev/docs/

// const spacing = 50;
const width = 150;
const height = 245;

// limits depth of parent / child render
const limit = 3;

function typeLookup(props) {
  // console.log(props.type);
  switch(props.type) {
    default:
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

function flowProps(props, parent, hidden, hideChildren) {
  return ({
    type: typeLookup(props),
    id: `${props.uuid}`,
    data: { width, height, label: props.name, isChildHidden: hideChildren, ...props },
    isHidden: hidden, //(level < limit),
    parentId: parent,
    children: []
  });
}

function flattenChildren(children, parentId, level) {
  const nextLevel = level + 1;
  if (children === undefined || children.length === 0) {
    return [];
  } else {
    return children.map((c, idx)=> {
      return ([
        {
          ...flowProps(c, parentId, (level > limit), (level + 1 > limit)),
          children: flattenChildren(c.children, c.uuid, nextLevel)
        },
        ...flattenChildren(c.children, c.uuid, nextLevel)
      ]);
    }).flat()
  }
}

function flattenConnections(children) { 
  return children.filter((c)=>(!c.isHidden && c.parentId !== 'App')).map((c, idx)=>{
    return {
      id: `${c.id}-parent-${c.parentId}-children`,
      // type: 'smoothstep',
      
      source: `${c.parentId}`,
      sourceHandle: `${c.parentId}-children`,

      target: `${c.id}`,
      targetHandle: `${c.id}-parent`,
      
      animated: false,
    }
  });
}

function flattenGeneratorConnections(connections) { 
  return connections.map((c, idx)=>{
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

function parseGenerators(generators) {
  return generators.map((props, idx) => flowProps(props, 'Scene', false, false));
}

function connectionsToFlow(threeScene) {
  const generators = parseGenerators(threeScene.generators);
  return [
    ...generators,
    ...flattenGeneratorConnections(threeScene.connections),
  ];
}

function peersToFlow(threeScene) {
  return threeScene.peers.map((props, idx) => flowProps(props, 'Scene', false, false));
}

function threeToFlow(threeScene) {
  const threeObjects = flattenChildren([threeScene.object], 'App', 1);
  return [
    ...threeObjects,
    ...flattenConnections(threeObjects),
    ...connectionsToFlow(threeScene),
    ...peersToFlow(threeScene)
  ];
}

export {
  threeToFlow
}