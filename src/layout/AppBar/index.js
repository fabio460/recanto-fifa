import React,{useState,useEffect} from "react"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PersonIcon from '@mui/icons-material/Person';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Link, Navigate, useNavigate, useNavigation, useLocation } from 'react-router-dom';
import ModalArtilharia from './modalArtilharia';
import ModalColocacao from './modalColocacao';
import ModalCriarUsuario from './modalCriarUsuario';
import ModalDeletarUsuario from './modalDeletarUsuario';
import ModalVitoriasEGols from './modalVitoriasEGols';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ModalAssistecia from "./modalAssistencia";
import { listaDeUsuariosApi } from "../../Api/usuariosApi";
import {useDispatch, useSelector} from 'react-redux'
import ModalDeletarEstatistica from "./modalDeletarEstatisticas";

const regrasStyle = {
  color:"",
  "@media (max-width:800px)":{
    color:"black"
  }
}
const settings = [<ModalCriarUsuario/>, <ModalDeletarUsuario/>, <ModalDeletarEstatistica/>];
function Appbar() {
  const navigate = useNavigate()
  const [usuarios, setListaDeUsuarios] = React.useState([])
  const participantes = useSelector(state=>state.participantesReducer.participantes)
  async function getUsuarios() {
    const u = await listaDeUsuariosApi  ()
    setListaDeUsuarios(u)
  }
  React.useEffect(()=>{
    getUsuarios()

  },[])

  const pages = [
    <ModalColocacao usuarios={usuarios} participantes={participantes}/>,
    <ModalArtilharia usuarios={usuarios} participantes={participantes}/>,
    <ModalAssistecia usuarios={usuarios} participantes={participantes}/>,
    <ModalVitoriasEGols usuarios={usuarios} participantes={participantes}/>,
    <div onClick= {()=> navigate("/regras")} style={regrasStyle}>Regras</div>,
    <div onClick={()=>navigate("/historico")}>Historico</div>
  ];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
 
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const h = useNavigate()
  
  const logo = "https://i.pinimg.com/736x/4b/2f/f6/4b2ff6f57503b821e01e738092fe9214.jpg"
  return (
    <AppBar position="fixed" sx={{bgcolor:"green"}}>
      <Container maxWidth="xl" sx={{margin:0}}>
        <Toolbar disableGutters>
          {/* <SportsEsportsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Avatar sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} src={logo}></Avatar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            RECANTO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none',minHeight:"600px" },
              }}
            >
              {pages?.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} sx={{  }}>
                  <Typography textAlign="center" >{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SportsEsportsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            RECANTO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Usuarios">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar><PersonIcon/></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Appbar;