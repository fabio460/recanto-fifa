const initialState = {
    colocacao:{}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'colocacao':
    return { ...state, ...payload }

  default:
    return state
  }
}
