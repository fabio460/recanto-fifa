import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { listaDeUsuariosApi } from '../api'

import AppBar from './AppBar'
import Ranking from './Ranking'
import Usuarios from './Usuarios'

export default function Layout() {
  const [Lista, setLista] = useState([])
  const loading = useSelector(state=>state.loadingReducer.loading)
  async function ListaDeUsuarios() {
    const l = await listaDeUsuariosApi()
    setLista(l)
  }
  useEffect(()=>{
    ListaDeUsuarios()
  },[loading])
  
  return (
    <div>
      <AppBar/>
      {
        loading?
          <div>
            <Box sx={{ display: 'flex',justifyContent:"center", alignItems:"center", height:200 }}>
              <CircularProgress />
            </Box>
          </div>:
          <div>
            <Ranking Lista={Lista}/>
            <Usuarios Lista={Lista}/>
          </div>
        }
    </div>
  )
}
