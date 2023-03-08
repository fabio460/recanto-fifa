import React,{useEffect, useState} from 'react'
import { lista } from '../../Lista'

import "./ListaDeJogadores.css"
import { useNavigate } from 'react-router-dom';
import ModalComprar from './modalCompraJogador';
import AutoComplete from './AutoComplete';
import { getUsuariosPorIdApi } from '../../api';
import { useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
  export default function TelaListaDeJogadores() {
    const [listaJogadores, setlistaJogadores] = useState([])
    const [value, setValue] = React.useState(null);
    const [Usuario, setUsuario] = useState()
    const [carregando, setcarregndo] = useState(false)
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
      setcarregndo(true)
    }
  
    useEffect(()=>{
      getUsuarioPorId()
    },[])
    const loading = useSelector(state=>state.loadingReducer.loading)
    
    return (
      <div>
        {
          carregando ? 
          <div className='TelaListaJogadores'>
            <div style={{display:"flex"}}>
              <div className='TelaListaJogadoresMenu' onClick={()=>h("/")}>Inicio</div>
              <div className='TelaListaJogadoresMenu' onClick={()=>h("/elencos")}>Meu time</div>

            </div>
            <div className='TelaListaJogadoresTitulo'>
              <div className='TelaListaJogadoresTituloLeft'>
                <h1 style={{marginRight:"20px"}}>Usuario {Usuario?.nome}</h1>
                {loading&&<div>carregando ...</div>}
              </div>
              <div className='TelaListaJogadoresTituloRigth'>
                <div className='TelaListaJogadoresMenuSaldo'>
                  Saldo {Usuario?.saldo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                </div>
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
                              <td>{elem.Posicao}</td> 
                              <td className='btnComprar'>
                                <ModalComprar jogador={elem} idUsuario={Usuario.id} Saldo={Usuario.saldo}/>
                              </td>
                          </tr>
                      )
                    })}
                  </tbody>
                </table>
              
              </div>
          </div>
          :
          <Box sx={{ display: 'flex',justifyContent:"center", alignItems:"center", height:"100vh" }}>
            <CircularProgress />
          </Box>
        }
      </div>
    );
}

