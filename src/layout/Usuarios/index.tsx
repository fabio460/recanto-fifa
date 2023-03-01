import React from 'react'
import { listaDeUsuarios } from '../../Uteis'
import CardUsuarios from './CardUsuarios'
import "./Usuarios.css"
export default function Usuarios() {
  const usuarios = listaDeUsuarios  
  return (
    <div className='UsuariosContainer'>
        {listaDeUsuarios.map((elem,key)=>{
            return (
               <CardUsuarios usuario={elem}/>
            )
        })}
    </div>
  )
}
