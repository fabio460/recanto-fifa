import React,{useEffect, useState} from 'react'
import { lista } from '../../Lista'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import "./ListaDeJogadores.css"
import { useNavigate } from 'react-router-dom';
import ModalComprar from './modalCompraJogador';
import { getTemporadaApi, getUsuariosPorIdApi } from '../../api';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

export default function TelaListaDeJogadores() {
  const [listaJogadores, setlistaJogadores] = useState([])
  const [value, setValue] = React.useState(null);
  const [Usuario, setUsuario] = useState()
  const [carregando, setcarregndo] = useState(false)
  const [Temporada, setTemporada] = useState()
  let usuarioLocalStorage = localStorage.getItem("usuarioSelecionado")
  const h = useNavigate()
  const [Jogador, setJogador] = useState()
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
    var ordenada = p.sort((a,b)=>{
      return a.OVER < b.OVER ? -1 : a.OVER > b.OVER ? 1 : 0;
    })
    setlistaJogadores(ordenada.reverse())
  },[value])

  async function getUsuarioPorId() {
    const p = await getUsuariosPorIdApi(id)
    setUsuario(p)
    setcarregndo(true)
    const temporada = await getTemporadaApi()
    setTemporada(temporada.numero)
  }

  useEffect(()=>{
    getUsuarioPorId()
  },[])
  const loading = useSelector(state=>state.loadingReducer.loading)
  const buscarJogador = ()=>{
    if(Jogador.trim() !== ""){       
      const p = lista.filter(e=>{
        if (e.label.toLowerCase().includes(Jogador.toLowerCase())) {
          return e
        }
      })
      var ordenada = p.sort((a,b)=>{
        return a.OVER < b.OVER ? -1 : a.OVER > b.OVER ? 1 : 0;
      })
      setlistaJogadores(ordenada.reverse())
      setJogador("")
    }
  }
  const buscarJogadorEnter = (e)=>{
    if(e.code === "Enter"){
      buscarJogador()
    }
  }
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
              <h1 style={{marginRight:"20px"}}>
                <div>Usuario {Usuario?.nome}</div>
                {Temporada && <h4 style={{color: Temporada === 1 ?"green":"red"}}>Temporada {Temporada}</h4>}
              </h1>
              {loading&&<div>carregando ...</div>}
            </div>
            <div className='TelaListaJogadoresTituloRigth'>
              <div className='TelaListaJogadoresMenuSaldo'>
                Saldo {Usuario?.saldo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
              </div>
              <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
              >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Selecione o jogador"
                  inputProps={{ 'aria-label': 'search google maps' }}
                  value={Jogador}
                  onChange={e=>setJogador(e.target.value)}
                  onKeyUp={e=> buscarJogadorEnter(e)}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton 
                  type="button"
                  sx={{ p: '10px' }} 
                  aria-label="search"
                  onClick={buscarJogador}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
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
                          <ModalComprar jogador={elem} idUsuario={Usuario.id} Saldo={Usuario.saldo} nomeDoComprador={Usuario.nome}/>
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

