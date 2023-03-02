const initialState = {
    dados:{}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case "dados":
    return { ...state, ...payload }

  default:
    return state
  }
}
