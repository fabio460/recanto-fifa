const initialState = {
    loading:false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case "loading":
    return { ...state, ...payload }

  default:
    return state
  }
}
