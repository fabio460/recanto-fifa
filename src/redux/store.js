import { configureStore } from '@reduxjs/toolkit'
import artilhariaRedux from './artilhariaRedux'
import colocacaoRedux from './colocacaoRedux'
import golsEmpVitoriasRedux from './golsEmpVitoriasRedux'
import loadingReducer from './loadingReducer'
export const store = configureStore({
    reducer: {
        golsEmpVitoriasRedux,
        artilhariaRedux,
        colocacaoRedux,
        loadingReducer
    },
})