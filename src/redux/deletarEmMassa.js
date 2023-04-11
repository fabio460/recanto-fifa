const initialState = {
    delete: ()=>{}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case "deletarEmMassa":
    return { ...state, ...payload }

  default:
    return state
  }
}
