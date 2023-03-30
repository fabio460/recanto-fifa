import { CircularProgress } from '@mui/material'
import Container from '@mui/material/Container'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listaDeUsuariosApi } from '../Api/usuariosApi'
import { getTemporadaApi } from '../Api/temporadasApi'

import AppBar from './AppBar'
import Ranking from './Ranking'
import Usuarios from './Usuarios'
import Vencedores from './Ranking/vencedores'
import Artilheiros from './Ranking/artilheiros'
import Assistentes from './Ranking/assistentes'

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
        {
          carregando?
          <div>
              <Box sx={{ display: 'flex',justifyContent:"center", alignItems:"center", height:"90vh" }}>
                <CircularProgress />
              </Box>
            </div>:
            <div>
              <Ranking Lista={Lista} temporada={temporada}/>
              <h3 style={{textAlign:"center"}}>Dados estatísticos</h3>
              <div className='estatistica'>
                <Vencedores/>
                <Artilheiros/>
                <Assistentes/>
              </div>
              <Usuarios Lista={Lista}/>
            </div>
          }
      </Container>
    </div>
  )
}
