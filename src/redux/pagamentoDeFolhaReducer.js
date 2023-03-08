const initialState = {
    folha:[]
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case "pagarFolha":
    return { ...state, ...payload }

  default:
    return state
  }
}
