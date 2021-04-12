const initialState = {
  active: false,
};

const rt_menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_MENU_ACTIVE':
      return {
        ...state,
        active: false,
      };
    case 'UPDATE_MENU_ACTIVE':
      return {
        ...state,
        active: action.payload,
      };
   default:
    return state;
  }
 }

 export default rt_menuReducer;