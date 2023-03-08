const initialState = {
    assistentes:{}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case "assistencia":
    return { ...state, ...payload }

  default:
    return state
  }
}
