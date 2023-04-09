import { CircularProgress } from '@mui/material'
import Container from '@mui/material/Container'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listaDeUsuariosApi } from '../Api/usuariosApi'
import { getTemporadaApi } from '../Api/temporadasApi'
import "./index.css"
import AppBar from './AppBar'
import Ranking from './Ranking'
import Usuarios from './Usuarios'
import Vencedores from './Graficos/vencedores'
import Artilheiros from './Graficos/artilheiros'
import Assistentes from './Graficos/assistentes'
import Graficos from './Graficos'


export default function Layout() {
  const [Lista, setLista] = useState([])
  const atualizado = useSelector(state=>state.atualizarTudo.atualizado)
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
  },[])

  return (
    <div>
      <AppBar/>
      <div className='principal'>
        {
          carregando?
          <div>
            <Box sx={{ display: 'flex',justifyContent:"center", alignItems:"center", height:"90vh" }}>
              <CircularProgress />
            </Box>
          </div>:
          <Container maxWidth="xl">
            <Ranking Lista={Lista} temporada={temporada}/>
            <Graficos/>
            <Usuarios Lista={Lista}/>
          </Container>
          }
      </div>
    </div>
  )
}
