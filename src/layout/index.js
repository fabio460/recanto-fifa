import React, { useEffect, useState } from 'react'
import { listaDeUsuariosApi } from '../api'

import AppBar from './AppBar'
import Ranking from './Ranking'
import Usuarios from './Usuarios'

export default function Layout() {
  const [Lista, setLista] = useState([])
  async function ListaDeUsuarios() {
    const l = await listaDeUsuariosApi()
    setLista(l)
  }
  useEffect(()=>{
    ListaDeUsuarios()
  },[])
  
  return (
    <div>
      <AppBar/>
      <Ranking Lista={Lista}/>
      <Usuarios Lista={Lista}/>
    </div>
  )
}
