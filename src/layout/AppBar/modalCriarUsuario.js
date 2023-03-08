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
import { criarUsuarioApi } from '../../api';
export default function ModalCriarUsuario() {
    const [listaJogadores, setlistaJogadores] = useState([])
    const [value, setValue] = React.useState(null);  
    const [open, setOpen] = React.useState(false);
    const [nome, setNome] = useState()
    const [folha, setFolha] = useState(0)
    const [saldo, setSaldo] = useState(0)
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
    const Confirmar = ()=>{
      if (!nome || nome.trim() ==="") {
        alert("O campo nome não pode estar em branco")
      } else {   
        criarUsuarioApi(nome,saldo,folha,listaJogadores,value)
      }
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
      <div onClick={handleClickOpen}>
        Criar usuário
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{background:"",width:"100%"}}
      >
        <DialogTitle id="alert-dialog-title">
          Criar usuario
        </DialogTitle>
        <DialogContent sx={dialogStyle}>
          <DialogContentText 
            id="alert-dialog-description" 
            sx={{display:"flex",flexDirection:"column"}}
            >
                <TextField onChange={e=>setNome(e.target.value)} label="Nome" size='small' sx={{marginTop:"12px"}}/>
                <TextField onChange={e=>setSaldo(e.target.value)} label="Saldo" size='small' sx={{marginTop:"12px"}}/>
                <TextField onChange={e=>setFolha(e.target.value)} label="Folha dalarial" size='small' sx={{marginTop:"12px"}}/>
                <div style={{marginTop:"12px"}}>
                    <AutoComplete 
                        value={value} 
                        setValue={setValue}
                    />
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
