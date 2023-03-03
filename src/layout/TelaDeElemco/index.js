import React from 'react'
import { useNavigate } from 'react-router-dom'
import { usuarioType } from '../../Types'
import "./TelaElenco.css"
export default function TelaDeElenco() {
  let usuarioLocalStorage = localStorage.getItem("usuarioSelecionado") || ""  
  var usuario = JSON.parse(usuarioLocalStorage) 
  const h = useNavigate()
  
  return (
    <div className='TelaDeElencoContainer'>
        <div className='TelaDeElencoHeader'>
            <h1>Usuario {usuario.nome}</h1>
            <button 
              onClick={()=>h("/")}
              className='btn btn-primary '
              
             >Voltar</button>
        </div>
        <div className='tabelaDeElencos'>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Posição</th>
                        <th scope="col">Overall</th>
                        <th scope="col">Clube</th>
                        <th scope="col"> </th>
                    </tr>
                </thead>
                <tbody>
                   {usuario.elenco.map((elem,key)=>{
                    return(
                        <tr>
                            <td >{elem.label}</td>
                            <td>{elem.Posição}</td>
                            <td>{elem.OVER}</td>
                            <td>{elem.CLUBE}</td>
                            <td><button className='btn btn-danger'>Despensar</button></td>
                        </tr>
                    )
                   })}
                </tbody>
            </table>
        </div>
    </div>
  )
}
