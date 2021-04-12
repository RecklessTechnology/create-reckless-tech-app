export const clearMenuActive = () => dispatch => {
  dispatch({
    type: 'CLEAR_MENU_ACTIVE',
  })
}

export const updateMenuActive = (val) => dispatch => {
  dispatch({
    type: 'UPDATE_MENU_ACTIVE',
    payload: val,
  })
}