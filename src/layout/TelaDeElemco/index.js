import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUsuariosPorIdApi } from '../../Api/usuariosApi'

import Menu from '@mui/material/Menu';
import ModalAtualizarUsuario from './modalAtualizarUsuario'
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./TelaElenco.css"
import { CircularProgress, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import { getTemporadaApi } from '../../Api/temporadasApi';
import { deletarJogadorApi } from '../../Api/jogadoresApi';
import { formatoMonetario, removeNome } from '../../Uteis';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SelectPosicoes from './selectPosicoes'
import TabelaDesktop from './tabelaDesktop'
import TabelaMobile from './tabelaMobile'

export default function TelaDeElenco() {
    const [usuario, setUsuario] = useState({})
    const [atualizar, setatualizar] = useState(false)
    const [folhaSalarial, setFolhaSalarial] = useState(0)
    let usuarioLocalStorage = localStorage.getItem("usuarioSelecionado") || ""  
    var id = JSON.parse(usuarioLocalStorage).id 
    const h = useNavigate()
    const [carregando, setcarregndo] = useState(false)
    const [Temporada, setTemporada] = useState()
    const [crescente, setCrescente] = useState({
      cresc:false,
      id:null
    })
    const [posicoes, setPosicoes] = useState([])
    
    var jogadores = usuario.jogadore
    const filtrarPosicao = jogadores?.filter(j=>{
      if (j.Posicao.includes(posicoes)) {
        return j
      }
    })
    jogadores = filtrarPosicao
    
    async function getUsuarioPorId() {  
      const p = await getUsuariosPorIdApi(id)
      setUsuario(p)
      let soma = 0
      p.jogadore?.forEach(j=>{
        soma += j.valor
      })
      setFolhaSalarial(soma*0.03)
      setcarregndo(true)
      const temporada = await getTemporadaApi()
      setTemporada(temporada.numero)
    }
    
    useEffect(()=>{
      getUsuarioPorId()
    },[atualizar])

    const loading = useSelector(state=>state.loadingReducer.loading)
    const despensar = (Id)=>{
      deletarJogadorApi(Id,atualizar,setatualizar)
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const medalhaDeOuro = 'https://mh-2-agencia-estoque.panthermedia.net/media/media_detail/0026000000/26306000/26306473_detail.jpg'
    const medalhaDePrata = "data:image/jpeg;base64,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"
    const medalhaDeBronse = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFKwzR_ll008hEr8iikWJZAa1ObGxHst-k9Q&usqp=CAU"
    
    const ordenarLista = (event)=>{
      document.querySelectorAll('.tabelaDeElencosTH').forEach(e=>{
        let f = e.children[0]
        f.classList.remove('arrowVisible') 
      })
      let id = event.target.id
      let filho = document.getElementById(id).children[0] || 
      filho.classList.add('arrowVisible')
      if (filho.className.includes('arrowDown')) {
        filho.classList.remove('arrowDown')
        filho.classList.add('arrowUp')
      } else {
        filho.classList.add('arrowDown')
        filho.classList.remove('arrowUp')
      }
      setCrescente({
        cresc: filho.className.includes('arrowDown'),
        id
      })    
    }
    function ordenaPorOver() {      
      jogadores?.sort((a, b)=>{
         return a.OVER < b.OVER ? (crescente.cresc && crescente.id === '3') ? -1: 1 : a.OVER > b.OVER ? (crescente.cresc && crescente.id === '3') ? 1: -1 : 0;
      })
    }
    function ordenaPorNome() {      
      jogadores?.sort((a, b)=>{
        return a.label < b.label ? (crescente.cresc && crescente.id === '1') ? -1: 1 : a.label > b.label ? (crescente.cresc && crescente.id === '1') ? 1: -1 : 0;
      })
    }
    function ordenaPorValor() {
      jogadores?.sort((a, b)=>{
        return a.valor < b.valor ? (crescente.cresc && crescente.id === '4') ? -1: 1 : a.valor > b.valor ? (crescente.cresc && crescente.id === '4') ? 1: -1 : 0;
      })
    }
    function ordenaPorPosicao() {
      jogadores?.sort((a, b)=>{
        return a.Posicao < b.Posicao ? (crescente.cresc && crescente.id === '2') ? -1: 1 : a.Posicao > b.Posicao ? (crescente.cresc && crescente.id === '2') ? 1: -1 : 0;
      })
    }
    function ordenaPorClube() {
      jogadores?.sort((a, b)=>{
        return a.CLUBE < b.CLUBE ? (crescente.cresc && crescente.id === '5') ? -1: 1 : a.CLUBE > b.CLUBE ? (crescente.cresc && crescente.id === '5') ? 1: -1 : 0;
      })
    }
    switch (crescente.id) {
      case '1':
        ordenaPorNome()
        break;
      case '2':
        ordenaPorPosicao()
        break;
      case '3':
        ordenaPorOver()
        break;  
      case '4':
        ordenaPorValor()
        break;
      case '5':
        ordenaPorClube()
        break;   
      default:
        ordenaPorOver()
        break;
    }

    return (
      <div>
        {
          carregando ? 
          <div className='TelaDeElencoContainer'>
            <div className='TelaDeElencoHeader'>
              <h4 className='TelaDeElencoHeaderNome'>Elenco do {usuario?.nome}</h4>
              <div className='TelaDeElencoHeaderDesktop'>
                <div style={{display:"flex", alignItems:"center"}}>
                  <button 
                    onClick={()=>h("/")}
                    className='btn btn-primary m-2'
                  >Inicio</button>
                  <button 
                    onClick={()=>h("/TelaListaDeJogadores")}
                    className='btn btn-info m-2'
                  >Comprar</button>
                  <ModalAtualizarUsuario id={id} usuario={usuario}/>
                </div>
              </div>
              
              <div className='TelaDeElencoHeaderMobile'>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{marginRight:"-8px", marginBottom:"8px"}}
                >
                  <MenuIcon/>
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <div 
                      onClick={()=>h("/")}
                      className=''
                    >Inicio</div>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <div 
                      onClick={()=>h("/TelaListaDeJogadores")}
                      className=''
                    >Comprar</div>
                  </MenuItem>
                  <MenuItem >
                    <ModalAtualizarUsuario id={id} fechar={handleClose} usuario={usuario} /> 
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <div>
              <Typography>Clube: {usuario.time}</Typography>
              <Typography style={{color:(usuario.saldo < 0 && "red")}}>Saldo: {formatoMonetario(usuario.saldo)}</Typography>
              <Typography>Folha: {formatoMonetario(folhaSalarial)}</Typography>
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
                          <h3>Temporada {Temporada}</h3>
                          <h5> Mercado de transferência encerrado</h5>
                        </div>
                      }
                    </div>:
                    <div style={{textAlign:"center"}}>Carregando temporada...</div> 
                }
              </div>
              <div style={{display:"flex", justifyContent:"flex-end"}}>
                <SelectPosicoes setPosicoes={setPosicoes}/>
              </div>
            </div>
            {
              usuario.saldo < 0 && 
              <div className='textoAviso'>Dispense jogadores para que o seu saldo seja positivo!</div>
            }
            <TabelaDesktop ordenarLista={ordenarLista} jogadores={jogadores} usuario={usuario} carregando={carregando} anchorEl={anchorEl}/>
          </div>:
          <Box sx={{ display: 'flex',justifyContent:"center", alignItems:"center", height:"100vh" }}>
             <CircularProgress />
          </Box>
        }
      </div>
    )
}
