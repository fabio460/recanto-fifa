import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux/es/exports';
import AutoComplete from '../TelaListaDeJogadores/AutoComplete';
import { lista } from '../../Lista'
import { adicionarSaldoApi, alterarSaldoApi, criarUsuarioApi, deletarJogadorApi, deletarUsuarioApi, listaDeUsuariosApi } from '../../api';
import { Autocomplete } from '@mui/material';
export default function ModalDispensarJogador({jogador, usuario}) { 
    const formatoMonetario = ()=> toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const dispatch = useDispatch()
    const handleClose = () => {
        setOpen(false);
    };

    const dialogStyle = {
      width:"600px",
      height:"",
      padding:"20px",
      "@media (max-width:800px)":{
      width:"100%"
      }
    }
    
    const valorGanho = (jogador.valor)*0.4
    const novoValorDoSaldo = usuario.saldo + valorGanho
    const Confirmar = ()=>{
        deletarJogadorApi(jogador.id)
        alterarSaldoApi(usuario.id,novoValorDoSaldo)
        alert("Jogador "+jogador.label+" libarado, você recebeu "+valorGanho.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}))
        handleClose()
    }
  return (
    <div>
      <button onClick={handleClickOpen} className='btn btn-primary'>Despensar</button>           
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{background:"",width:"100%"}}
      >
        <DialogTitle id="alert-dialog-title">
           Deseja realmente dispensar o jogador {jogador.label}?
        </DialogTitle>
        <DialogContent sx={dialogStyle}>
          <DialogContentText 
            id="alert-dialog-description" 
            sx={{display:"flex",flexDirection:"column"}}
            >
              <div style={{marginTop:"12px"}}>
                 Essa solicitação não poderá ser revertida.
                 <div>Você ganhara {valorGanho.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
              </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Confirmar}>Confirmar</Button>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
