import React, { useEffect, useState } from 'react'
import { listaDeUsuariosApi } from '../../api'
import { listaDeUsuarios } from '../../Uteis'
import CardUsuarios from './CardUsuarios'
import "./Usuarios.css"
export default function Usuarios() {
  const usuarios = listaDeUsuarios  
  const [Lista, setLista] = useState([])
  async function ListaDeUsuarios() {
    const l = await listaDeUsuariosApi()
    setLista(l)
  }
  useEffect(()=>{
    ListaDeUsuarios()
  },[])
  return (
    <div className='UsuariosContainer'>
        {Lista.map((elem,key)=>{
            return (
               <CardUsuarios usuario={elem}/>
            )
        })}
    </div>
  )
}
