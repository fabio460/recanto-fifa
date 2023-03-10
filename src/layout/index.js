import { CircularProgress } from '@mui/material'
import Container from '@mui/material/Container'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { alterarTemporadaApi, getTemporadaApi, listaDeUsuariosApi, selecionarTemporadaApi } from '../api'

import AppBar from './AppBar'
import Ranking from './Ranking'
import Usuarios from './Usuarios'

export default function Layout() {
  const [Lista, setLista] = useState([])
  const loading = useSelector(state=>state.loadingReducer.loading)
  const [carregando, setcarregndo] = useState(false)
  const [temporada, setTemporada] = useState()
  const dispatch = useDispatch()
  async function ListaDeUsuarios() {
    setcarregndo(true)
    const l = await listaDeUsuariosApi(dispatch)
    const t = await getTemporadaApi()
    setTemporada(t)
    setLista(l)
    setcarregndo(false)
  }
  useEffect(()=>{
    ListaDeUsuarios() 

  },[loading])
  

    
    
  return (
    <div>
      <AppBar/>
      <Container maxWidth="xl">
        <Ranking Lista={Lista} temporada={temporada}/>
        {
          carregando?
            <div>
              <Box sx={{ display: 'flex',justifyContent:"center", alignItems:"center", height:200 }}>
                <CircularProgress />
              </Box>
            </div>:
            <div>
              <Usuarios Lista={Lista}/>
            </div>
          }
      </Container>
    </div>
  )
}
