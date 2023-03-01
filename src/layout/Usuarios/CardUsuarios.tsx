import React from 'react'
import { useNavigate } from 'react-router-dom'
import { usuarioType } from '../../Types'

interface userType{
   usuario:usuarioType
}
export default function CardUsuarios({usuario}:userType) {
  const h = useNavigate()
  const selecionarElenco = ()=>{
    localStorage.setItem("usuarioSelecionado",JSON.stringify(usuario))
    h("/elencos")
  }
  const comprarJogador = ()=>{
    localStorage.setItem("usuarioSelecionado",JSON.stringify(usuario))
    h("/TelaListaDeJogadores")
  }
  return (
    <div className='CardUsuarios'>
      <div className='UsuarioNome'>{usuario.nome}</div>
      <div className='UsuarioSaldoLabel'>Saldo</div>
      <div className='UsuarioSaldo'>R$ {usuario.saldo}</div>
      <button  
        className="btn btn-success w-100 m-1"
        onClick={comprarJogador}
      >Comprar jogador</button>
      <button onClick={selecionarElenco} className="btn btn-success w-100 m-1">Meu elenco</button>
    </div>
  )
}
