import React,{useEffect, useState} from 'react'
import { lista } from '../../Lista'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./ListaDeJogadores.css"
import { useNavigate } from 'react-router-dom';
import ModalComprar from './modalCompraJogador';

  export default function TelaListaDeJogadores() {
    const [listaJogadores, setlistaJogadores] = useState([])
    var clubesComRepetocoes = []
    lista.map((elem,key)=>{
      clubesComRepetocoes.push(elem.CLUBE)   
    })
    const clubes = [...new Set(clubesComRepetocoes)]
    const [value, setValue] = React.useState(null);
    let usuarioLocalStorage = localStorage.getItem("usuarioSelecionado")
    const h = useNavigate()
    if (!usuarioLocalStorage) {
      h("/")
    }
    var usuario = JSON.parse(usuarioLocalStorage) 
    useEffect(()=>{
      const p = lista.filter(e=>{
        if (e.CLUBE.includes(value)) {
          return e
        }
      })
      setlistaJogadores(p)
    },[value])

    return (
      <div className='TelaListaJogadores'>
         <div className='TelaListaJogadoresTitulo'>
          <div className='TelaListaJogadoresTituloLeft'>
            <h1 style={{marginRight:"20px"}}>Usuario {usuario.nome}</h1>
            <button onClick={()=>h("/")} className='btn btn-primary' >voltar</button>
          </div>
          <div className='TelaListaJogadoresTituloRigth'>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              id="combo-box-demo"
              options={clubes}
              sx={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="Selecione o clube" />}
            />
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
                             <ModalComprar elem={elem}/>
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

