const sceneData = [
  {
    name: 'Sun',
    src: '/sun/scene.gltf',
    children: {
      earth: {
        src: '/earth/scene.gltf',
        children: {
          moon: {
            src: '/moon/scene.gltf',
          },
        },
      },
    },
  },
];

export default sceneData;
