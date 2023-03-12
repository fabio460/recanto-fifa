import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletarJogadorApi, getUsuariosPorIdApi } from '../../api'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ModalAtualizarUsuario from './modalAtualizarUsuario'
import ModalDispensarJogador from './modalDispensarJogador'
import ModalTransferirJogador from './modalTransferirJogador'
import MenuIcon from '@mui/icons-material/Menu';
import "./TelaElenco.css"
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
export default function TelaDeElenco() {
  const [usuario, setusuario] = useState({})
  const [atualizar, setatualizar] = useState(false)
  const [folhaSalarial, setFolhaSalarial] = useState(0)
  let usuarioLocalStorage = localStorage.getItem("usuarioSelecionado") || ""  
  var id = JSON.parse(usuarioLocalStorage).id 
  const h = useNavigate()
  const [carregando, setcarregndo] = useState(false)

  async function getUsuarioPorId() {  
    const p = await getUsuariosPorIdApi(id)
    setusuario(p)
    let soma = 0
    p.jogadore?.forEach(j=>{
       soma += j.valor
    })
    setFolhaSalarial(soma*0.03)
    setcarregndo(true)
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
  
  return (
    <div>
      {
        carregando ? 
        <div className='TelaDeElencoContainer'>
            <div className='TelaDeElencoHeader'>
              <h5>Usuario: {usuario?.nome}</h5>
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
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <MenuIcon/>
                </Button>
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
                <h5>Clube: {usuario.time}</h5>
                <h5>Saldo: {usuario.saldo?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h5>
                <h5>Folha: {folhaSalarial?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h5>
                
            </div>
            <div className='tabelaDeElencos'>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Posição</th>
                            <th scope="col">Overall</th>
                            <th scope="col">Clube</th>
                            <th scope="col">Salário</th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                       {usuario.jogadore?.map((elem,key)=>{
                        return(
                            <tr>
                                <td >{elem.label}</td>
                                <td>{elem.Posicao}</td>
                                <td>{elem.OVER}</td>
                                <td>{elem.CLUBE}</td>
                                <td>{elem.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                                <td style={{display:"flex",justifyContent:"flex-end"}}>
                                  {/* <button onClick={()=> despensar(elem.id)} className='btn btn-danger me-3'>Despensar</button> */}
                                  <ModalDispensarJogador jogador={elem} usuario={usuario} carregando={carregando}/>  
                                  <ModalTransferirJogador id={elem.id} usuario={usuario} carregando={carregando}/>
                                </td>
                            </tr>
                        )
                       })}
                    </tbody>
                </table>
            </div>
        </div>:
        <Box sx={{ display: 'flex',justifyContent:"center", alignItems:"center", height:"100vh" }}>
         <CircularProgress />
        </Box>
      }
    </div>
  )
}
