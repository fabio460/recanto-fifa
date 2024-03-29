import React,{useEffect, useState} from 'react'
import { lista } from '../../Lista'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import "./CompraDeJogadores.css"
import { useNavigate } from 'react-router-dom';
import ModalComprar from './modalCompraJogador';
import { getUsuariosPorIdApi } from '../../Api/usuariosApi';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import { getTemporadaApi } from '../../Api/temporadasApi';
import Carregando from '../Ranking/carregando';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { listarTodosOsJogadoresApi } from '../../Api/jogadoresApi';
import { formatoMonetario, removeNome } from '../../Uteis';
import MenuMobile from './menuMobile'
export default function CompraDeJogadores() {
  const [listaJogadores, setlistaJogadores] = useState([])
  const [value, setValue] = React.useState("");
  const [Usuario, setUsuario] = useState()
  const [carregando, setcarregndo] = useState(false)
  const [carregarTabela, setCarregarTabela] = useState(false)
  const [Temporada, setTemporada] = useState()
  const [page, setPage] = React.useState(1);
  const loading = useSelector(state=>state.loadingReducer.loading)
  let [quantDeJogadores, setQuantDeJogadores] = useState();
  const itensPorPagina = 7
  const handleChange = (event, value) => {
    setPage(value);
  };
  let usuarioLocalStorage = localStorage.getItem("usuarioSelecionado")
  const h = useNavigate()
  const [Jogador, setJogador] = useState()
  if (!usuarioLocalStorage) {
    h("/")
  }
  var id = JSON.parse(usuarioLocalStorage).id
  const inicio = page* itensPorPagina - itensPorPagina
  const fim = page* itensPorPagina - 1
  

  async function ListaTotal() {
    setCarregarTabela(true)    
    const totalDeJogadores = await listarTodosOsJogadoresApi()
    setCarregarTabela(false)
    let nomeDeTodosJogadores = totalDeJogadores.map(jog=>jog.label)
    let listaSemJogadoresComprados = lista.filter(elem=>{
      if (nomeDeTodosJogadores.includes(elem.label) === false) {
        return elem
      }
    })
    var ordenada = listaSemJogadoresComprados.sort((a,b)=>{
      return a.OVER < b.OVER ? 1 : a.OVER > b.OVER ? -1 : 0;
    })
    if (ordenada.length === 0) {
      setQuantDeJogadores(0)
    }
    let paginada = ordenada.filter((elem, key)=>{
      setQuantDeJogadores(key + 1)
      if (key >= inicio && key <= fim) {
        return elem          
      }
    })
    if (Jogador !== "") {
      setlistaJogadores(paginada)
    }
  }

  const buscarJogador = async()=>{ 
    setCarregarTabela(true)
    const totalDeJogadores = await listarTodosOsJogadoresApi()
    setCarregarTabela(false)
    let nomeDeTodosJogadores = totalDeJogadores.map(jog=>jog.label)
    let listaSemJogadoresComprados = lista.filter(elem=>{
      if (nomeDeTodosJogadores.includes(elem.label) === false) {
        return elem
      }
    })
    const p = listaSemJogadoresComprados.filter((e, key)=>{
      if (e.label.toLowerCase().includes(Jogador.toLowerCase().trim())) {
        return e
      }
    })
    var ordenada = p.sort((a,b)=>{
      return a.OVER < b.OVER ? 1 : a.OVER > b.OVER ? -1 : 0;
    })

    if (ordenada.length === 0) {
      setQuantDeJogadores(0)
      ListaTotal()
    }
    let paginada = ordenada.filter((elem, key)=>{
      setQuantDeJogadores(key + 1)
      if (key >= inicio && key <= fim) {
        return elem          
      }
    })

  
    setlistaJogadores(paginada)
  }
  useEffect(()=>{
    if (!Jogador || Jogador.trim() === "") {
      ListaTotal()
    }else{
      buscarJogador()
    }
  },[value, page])

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
  
  const buscarJogadorEnter = (e)=>{
    if(e.code === "Enter"){
      buscar()
    }
  }

  const buscar = ()=>{
    setPage(1)
    buscarJogador()
  }
  const folha = Usuario?.jogadore.reduce((acum, item)=>{
    return acum + item.valor
  },0)*0.03

  return (
    <div>
      {loading && 
      <div className='carregandoRanking'>
        <div className='carregandoRankingContent'><Carregando/></div>  
      </div>
      }
      {
        carregando ? 
        <div className='TelaListaJogadores'>
          <div className='CompraDeJogadoresHeaderDesk'>
            <h1>Compra de jogadores</h1>       
            <div style={{display:"flex"}}>
              <div className='TelaListaJogadoresMenu' onClick={()=>h("/")}>Inicio</div>
              <div className='TelaListaJogadoresMenu' onClick={()=>h("/elencos")}>Elenco</div>
            </div>
          </div>
          <div className='CompraDeJogadoresHeaderMobile'>
            <h4>Comprar jogador</h4>
            <MenuMobile/>
          </div>
          <h1 className='CompraDeJogadoresNomeMobile'>{Usuario?.nome}</h1>
          <div className='TelaListaJogadoresTitulo'>
              <h1 className='tituloHeader'>
                <div>Usuario {Usuario?.nome}</div>
              </h1>
              <div>
                {
                Temporada ? 
                  <div>
                  {
                    Temporada === 2 ?
                        <div className='TextoMercadoAberto'>
                          <h5> Mercado de transferência aberto</h5>
                        </div>:
                        <div className='TextoMercadoFechado'>
                          <h5> Mercado de transferência encerrado</h5>
                        </div>
                      }
                    </div>:
                    <div style={{textAlign:"center"}}>Carregando temporada...</div> 
                }
              </div>
            <div className='TelaListaJogadoresTituloRigth'>
              <div className='TelaListaJogadoresMenuSaldo'>
                <Typography style={{color:(Usuario?.saldo < 0 && "red")}}>Saldo: {formatoMonetario(Usuario?.saldo)}</Typography>
              </div>
              <div className='TelaListaDeJogadoresFolha'>
                <Typography >Folha {formatoMonetario(folha)}</Typography>
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
                  onClick={buscar}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
             {
                !carregarTabela ?
                <div className='texto_quant_jogadores'>
                  Total de {listaJogadores.length === 0 ?
                  0 : quantDeJogadores} 
                  {listaJogadores.length === 1 ? " jogador encontrado" : " jogadores encontrados" } 
                </div>:
                <div className='texto_quant_jogadores'>carregando ...</div>
              }
            </div>
            
          </div>
          <div className='containerDaTabela'>
            <div>
              {
                listaJogadores.length === 0 ? 
                <div className='naoEncontrado'> Não encontrado ! </div>:
                <div className='tabela'>
                  {
                    !carregarTabela ?
                    <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Jogador</th>
                        <th scope="col">Overall</th>
                        <th scope="col">Posição</th>                   
                        <th scope="col">Time</th>
                        <th scope="col"> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaJogadores.map((elem,key)=>{
                        return(
                          <tr>
                            <td className='td_nome'>{elem.label}</td>
                            <td className='td_over'>{elem.OVER}</td>
                            <td className='td_posicao'>{removeNome(elem.Posicao)}</td> 
                            <td className='td_clube'>{elem.CLUBE}</td>
                            <td className='btnComprar'>
                              <ModalComprar jogador={elem} idUsuario={Usuario.id} Saldo={Usuario.saldo} nomeDoComprador={Usuario.nome} Usuario={Usuario}/>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                    </table>:
                    <Box sx={{ display: 'flex',justifyContent:"center", alignItems:"center", height:"50vh", width:"100%" }}>
                        <CircularProgress />
                    </Box>
                  }
                </div>
              }
            </div>
            <div>
              {
                !carregarTabela &&
                <Stack spacing={2}>
                  <div className='paginacao'>
                    <Pagination 
                      size='small'
                      count={listaJogadores.length === 0 ? 0 : Math.ceil(quantDeJogadores/itensPorPagina)}
                      page={page} 
                      onChange={handleChange} 
                      color="secondary" 
                      />
                  </div>
                </Stack>
                }
            </div>
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

