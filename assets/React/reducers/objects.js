const initialState = {
  objectList: [
    {
      url: 'sphere',
      active: false,
      hover: false,
      id: 'Sphere Parent',
      position: [-2, 2, 0],
      rotation: [0, 0, 0],
      scale: 1,
      responsiveness: 20,
    },
    {
      url: 'sphere',
      active: false,
      hover: false,
      id: 'Sphere Child',
      position: [0.5, 0.5, 0],
      rotation: [0, 0, 0],
      scale: 0.75,
      responsiveness: 20,
    },
    {
      url: 'sphere',
      active: false,
      hover: false,
      id: 'Sphere Grandchild',
      position: [0.5, 0.5, 0],
      rotation: [0, 0, 0],
      scale: 0.75,
      responsiveness: 20,
    },
    {
      url: '/Models/cube/scene.gltf',
      active: false,
      hover: false,
      id: 'GLTF Cube',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: 1,
      responsiveness: 20,
    },
    {
      url: '/Models/cone/scene.gltf',
      active: false,
      hover: false,
      id: 'GLTF Cone',
      position: [2, 2, 0],
      rotation: [0, 0, 0],
      scale: 0.5,
      responsiveness: 20,
    },
  ],
};

const objectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_ACTIVE':
      return {
        ...state,
        objectList: [
          ...state.objectList.map((obj) => {
            return {
              ...obj,
              active: false
            }
          }),
        ]
      };
    case 'UPDATE_ACTIVE':
      return {
        ...state,
        objectList: [
          ...state.objectList.map((obj) => {
            if (obj.id === action.id) {
              return {
                ...obj,
                active: true
              }
            } else {
              return {
                ...obj,
                active: false
              }
            }
          }),
        ]
      };
    case 'UPDATE_HOVER':
      return {
        ...state,
        objectList: [
          ...state.objectList.filter((s) => (s.id !== action.id)),
          {
            ...state.objectList.filter((s) => (s.id === action.id))[0],
            hover: action.payload,
          }
        ]
      };
    case 'UPDATE_SCALE':
      return {
        ...state,
        objectList: [
          ...state.objectList.filter((s) => (s.id !== action.id)),
          {
            ...state.objectList.filter((s) => (s.id === action.id))[0],
            scale: action.payload,
          }
        ]
      };
    case 'UPDATE_POSITION':
      return {
        ...state,
        objectList: [
          ...state.objectList.filter((s) => (s.id !== action.id)),
          {
            ...state.objectList.filter((s) => (s.id === action.id))[0],
            position: action.payload,
          }
        ]
      };
    case 'UPDATE_ROTATION':
      return {
        ...state,
        objectList: [
          ...state.objectList.filter((s) => (s.id !== action.id)),
          {
            ...state.objectList.filter((s) => (s.id === action.id))[0],
            rotation: action.payload,
          }
        ]
      };
   default:
    return state;
  }
 }

 export default objectsReducer;