const initialState = {
    folha:0
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case "folhaSalarial":
    return { ...state, ...payload }

  default:
    return state
  }
}
