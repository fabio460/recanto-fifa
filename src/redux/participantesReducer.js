const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case "participantes":
    return { ...state, ...payload }

  default:
    return state
  }
}
