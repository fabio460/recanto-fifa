import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux/es/exports';
import AutoComplete from '../TelaListaDeJogadores/AutoComplete';
import { lista } from '../../Lista'
import { atualizarUsuarioApi, criarUsuarioApi, getUsuariosPorIdApi } from '../../api';
export default function ModalAtualizarUsuario({id, usuario, fechar}) {
    const [listaJogadores, setlistaJogadores] = useState([])
    const [value, setValue] = React.useState(null);  
    const [open, setOpen] = React.useState(false);
    const [nome, setNome] = useState()
    const [folha, setFolha] = useState()
    const [saldo, setSaldo] = useState()
    const [time, setTime] = useState()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const dispatch = useDispatch()
    const handleClose = () => {
        setOpen(false);
        fechar()
    };

    const dialogStyle = {
        width:"600px",
        height:"",
        padding:"20px",
        "@media (max-width:800px)":{
        width:"100%"
        }
    }
    const Confirmar = async()=>{
         atualizarUsuarioApi(
            id,
            nome || usuario.nome,
            saldo || usuario.saldo,
            folha || usuario.folha,
            time || usuario.time    
        )
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
    <div>
      <button 
        onClick={handleClickOpen}
        className='btn btn-warning '
      >Atualizar</button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{background:"",width:"100%"}}
      >
        <DialogTitle id="alert-dialog-title">
          Atualizando de dados de {usuario.nome} 
        </DialogTitle>
        <DialogContent sx={dialogStyle}>
          <DialogContentText 
            id="alert-dialog-description" 
            sx={{display:"flex",flexDirection:"column"}}
            >
                <TextField defaultValue={usuario.nome} onChange={e=>setNome(e.target.value)} label="Nome" size='small' sx={{marginTop:"12px"}}/>
                <TextField defaultValue={usuario.saldo} onChange={e=>setSaldo(e.target.value)} label="Saldo" size='small' sx={{marginTop:"12px"}}/>
                <TextField defaultValue={usuario.folha} onChange={e=>setFolha(e.target.value)} label="Folha dalarial" size='small' sx={{marginTop:"12px"}}/>
                <TextField defaultValue={usuario.time} onChange={e=>setTime(e.target.value)} label="Time" size='small' sx={{marginTop:"12px"}}/>
              
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
