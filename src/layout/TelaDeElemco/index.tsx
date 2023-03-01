import React from 'react'
import { useNavigate } from 'react-router-dom'
import { usuarioType } from '../../Types'
import "./TelaElenco.css"
export default function TelaDeElenco() {
  let usuarioLocalStorage = localStorage.getItem("usuarioSelecionado") || ""  
  var usuario:usuarioType = JSON.parse(usuarioLocalStorage) 
  const h = useNavigate()
  return (
    <div>
        <h1>Usuario {usuario.nome}</h1>
        <button onClick={()=>h("/")} className='btn btn-primary' >voltar</button>

        <div className='tabelaDeElencos'>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Time</th>
                        <th scope="col">Jogador</th>
                        <th scope="col">Overall</th>
                        <th scope="col">Salário</th>
                        <th scope="col">Despensar </th>
                    </tr>
                </thead>
                <tbody>
                   {usuario.elenco.map((elem,key)=>{
                    return(
                        <tr>
                            <td >{elem.time}</td>
                            <td>{elem.jogador}</td>
                            <td>{elem.over}</td>
                            <td>{elem.salario}</td>
                            <td><button className='btn btn-danger'>X</button></td>
                        </tr>
                    )
                   })}
                </tbody>
            </table>
        </div>
    </div>
  )
}
