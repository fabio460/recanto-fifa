import { configureStore } from '@reduxjs/toolkit'
import artilhariaRedux from './artilhariaRedux'
import assisteciaReducer from './assisteciaReducer'
import colocacaoRedux from './colocacaoRedux'
import folhaSalarialReducer from './folhaSalarialReducer'
import golsEmpVitoriasRedux from './golsEmpVitoriasRedux'
import loadingReducer from './loadingReducer'
import pagamentoDeFolhaReducer from './pagamentoDeFolhaReducer'
import participantesReducer from './participantesReducer'
import atualizarTudo from './atualizarTudo'
import deletarEmMassa from './deletarEmMassa'
export const store = configureStore({
    reducer: {
        deletarEmMassa,
        atualizarTudo,
        participantesReducer,
        pagamentoDeFolhaReducer,
        assisteciaReducer,
        folhaSalarialReducer,
        golsEmpVitoriasRedux,
        artilhariaRedux,
        colocacaoRedux,
        loadingReducer
    },
})