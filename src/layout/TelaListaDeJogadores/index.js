import React,{useEffect, useState} from 'react'
import { lista } from '../../Lista'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./ListaDeJogadores.css"
import { useNavigate } from 'react-router-dom';

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
          <h1 className='listaDeJogadoresTitulo'>Compra de jogadores</h1>
          <div className='autocomplete'>
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
                          <td className='btnComprar'><button className='btn btn-primary '>Comprar</button></td>
                      </tr>
                  )
                })}
              </tbody>
            </table>
           
          </div>
      </div>
    );
}

