import { configureStore } from '@reduxjs/toolkit'
import artilhariaRedux from './artilhariaRedux'
import colocacaoRedux from './colocacaoRedux'
import folhaSalarialReducer from './folhaSalarialReducer'
import golsEmpVitoriasRedux from './golsEmpVitoriasRedux'
import loadingReducer from './loadingReducer'
export const store = configureStore({
    reducer: {
        folhaSalarialReducer,
        golsEmpVitoriasRedux,
        artilhariaRedux,
        colocacaoRedux,
        loadingReducer
    },
})