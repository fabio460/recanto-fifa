import { configureStore } from '@reduxjs/toolkit'
import artilhariaRedux from './artilhariaRedux'
import colocacaoRedux from './colocacaoRedux'
export const store = configureStore({
    reducer: {
        artilhariaRedux,
        colocacaoRedux
    },
})