import React from 'react'
import Menu from '@mui/material/Menu';
import { CircularProgress, IconButton } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import ModalAtualizarUsuario from './modalAtualizarUsuario';
import MenuIcon from '@mui/icons-material/Menu';
export default function TabelaMobile({handleClick, handleClose, usuario, id, open, anchorEl}) {
  const h = useNavigate()  
  return (
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
  )
}
