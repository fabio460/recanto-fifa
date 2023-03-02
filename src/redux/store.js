import { configureStore } from '@reduxjs/toolkit'
import artilhariaRedux from './artilhariaRedux'
import colocacaoRedux from './colocacaoRedux'
import golsEmpVitoriasRedux from './golsEmpVitoriasRedux'
export const store = configureStore({
    reducer: {
        golsEmpVitoriasRedux,
        artilhariaRedux,
        colocacaoRedux
    },
})