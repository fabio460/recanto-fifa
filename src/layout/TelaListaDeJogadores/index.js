import React,{useEffect, useState} from 'react'
import { lista } from '../../Lista'

import "./ListaDeJogadores.css"
import { useNavigate } from 'react-router-dom';
import ModalComprar from './modalCompraJogador';
import AutoComplete from './AutoComplete';
import { getUsuariosPorIdApi } from '../../api';

  export default function TelaListaDeJogadores() {
    const [listaJogadores, setlistaJogadores] = useState([])
    const [value, setValue] = React.useState(null);
    const [Usuario, setUsuario] = useState()
    let usuarioLocalStorage = localStorage.getItem("usuarioSelecionado")
    const h = useNavigate()

    if (!usuarioLocalStorage) {
      h("/")
    }
    var id = JSON.parse(usuarioLocalStorage).id
    useEffect(()=>{
      const p = lista.filter(e=>{
        if (e.CLUBE.includes(value)) {
          return e
        }
      })
      setlistaJogadores(p)
    },[value])

    async function getUsuarioPorId() {
      const p = await getUsuariosPorIdApi(id)
      setUsuario(p)
    }
  
    useEffect(()=>{
      getUsuarioPorId()
    },[])
    return (
      <div className='TelaListaJogadores'>
         <div className='TelaListaJogadoresTitulo'>
          <div className='TelaListaJogadoresTituloLeft'>
            <h1 style={{marginRight:"20px"}}>Usuario {Usuario?.nome}</h1>
            <button onClick={()=>h("/")} className='btn btn-primary' >voltar</button>
          </div>
          <div className='TelaListaJogadoresTituloRigth'>
            <AutoComplete  value={value} setValue={setValue}/>
          </div>
         </div>


          <div className='tabela'>
            <table className="table">
              <thead className="thead-dark">
                  <tr>
                      <th scope="col">Time</th>
                      <th scope="col">Jogador</th>
                      <th scope="col">Overall</th>
                      <th scope="col">Posição</th>
                      <th scope="col"> </th>
                  </tr>
              </thead>
              <tbody>
                {listaJogadores.map((elem,key)=>{
                  return(
                      <tr>
                          <td >{elem.CLUBE}</td>
                          <td>{elem.label}</td>
                          <td>{elem.OVER}</td>
                          <td>{elem.Posição}</td>
                          <td className='btnComprar'>
                             <ModalComprar jogador={elem} idUsuario={Usuario.id}/>
                          </td>
                      </tr>
                  )
                })}
              </tbody>
            </table>
           
          </div>
      </div>
    );
}

