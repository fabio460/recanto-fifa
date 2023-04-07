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
import { adicionarSaldoApi, alterarSaldoApi, criarUsuarioApi, deletarUsuarioApi, listaDeUsuariosApi } from '../../Api/usuariosApi';
import { Autocomplete, CircularProgress } from '@mui/material';
import { getTemporadaApi } from '../../Api/temporadasApi';
import { deletarJogadorApi } from '../../Api/jogadoresApi';
export default function ModalDispensarJogador({jogador, usuario}) { 
  const formatoMonetario = ()=> toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
  const [open, setOpen] = React.useState(false);
  const [carregando, setCarregando] = useState({status:false, jogador: null})
  const handleClickOpen = () => {
      setOpen(true);
  };

  const dispatch = useDispatch()
  const handleClose = () => {
    setCarregando({status:false, jogador: jogador.label})  
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
  

  const folha = usuario.jogadore.reduce((acum, item)=>{
    return acum + item.valor
  },0)*0.03

  
  const valorGanho = jogador.OVER >= 90 ? (jogador.valor)*0.6 : (jogador.valor)*0.4 
  const valorDaReducaoDaFolha = folha - (jogador.valor)*0.03

  const novoValorDoSaldo = usuario.saldo + valorGanho
  const Confirmar = async()=>{
      setCarregando({status:true, jogador: jogador.label})
      const temporada = await getTemporadaApi()
      if (temporada.numero === 2) {                
        deletarJogadorApi(jogador.id)
        adicionarSaldoApi(usuario.id,novoValorDoSaldo)
        alert("Jogador "+jogador.label+" libarado, você recebeu "+valorGanho.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}))
        handleClose()
      } else {
        alert("Voçê só pode dispensar jogadores na temporada 2")
      }
  }

  return (
    <div>
      {
        carregando.status === true && carregando.jogador === jogador.label ?  
        <Button  disabled >
          <CircularProgress sx={{width:"20px",height:"20px"}}/>
        </Button>:       
        <button onClick={handleClickOpen} className='btn btn-primary'>Despensar</button> 
      }          
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{background:"",width:"100%"}}
      >
        <DialogTitle id="alert-dialog-title">
           Ao dispensar o jogador {jogador.label} voçe receberá {valorGanho.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} e sua
           folha reduzirá para {valorDaReducaoDaFolha.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        </DialogTitle>
        <DialogContent sx={dialogStyle}>
          <DialogContentText 
            id="alert-dialog-description" 
            sx={{display:"flex",flexDirection:"column"}}
            >
              <div style={{marginTop:"12px"}}>
      
              </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Confirmar}>Confirmar</Button>
          <Button color='error' onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
