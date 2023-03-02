const initialState = {
    artilheiros:{}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case "artilharia":
    return { ...state, ...payload }

  default:
    return state
  }
}
