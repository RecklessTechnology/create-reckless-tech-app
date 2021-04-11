export const clearActive = () => dispatch => {
  dispatch({
    type: 'CLEAR_ACTIVE',
  })
}

export const updateActive = (id) => dispatch => {
  dispatch({
    type: 'UPDATE_ACTIVE',
    id: id,
  })
}

export const updateHover = (id, val) => dispatch => {
  dispatch({
    type: 'UPDATE_HOVER',
    id: id,
    payload: val,
  })
}

export const updatePosition = (id, val) => dispatch => {
  dispatch({
    type: 'UPDATE_POSITION',
    id: id,
    payload: val,
  })
}

export const updateRotation = (id, val) => dispatch => {
  dispatch({
    type: 'UPDATE_ROTATION',
    id: id,
    payload: val,
  })
}

export const updateScale = (id, val) => dispatch => {
  dispatch({
    type: 'UPDATE_SCALE',
    id: id,
    payload: val,
  })
}