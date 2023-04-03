const initialState = {
    atualizado:false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case "atualizarTudo":
    return { ...state, ...payload }

  default:
    return state
  }
}
