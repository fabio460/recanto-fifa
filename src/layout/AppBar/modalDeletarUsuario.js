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
import { criarUsuarioApi, deletarUsuarioApi, listaDeUsuariosApi } from '../../api';
import { Autocomplete } from '@mui/material';
export default function ModalDeletarUsuario() {
    const [usuarios, setUsuarios] = useState([])
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
         deletarUsuarioApi(age)
        handleClose()
    }

    async function getUsuarios() {
        const p =await listaDeUsuariosApi()
        setUsuarios(p)
       
    }
    useEffect(()=>{
        getUsuarios()
      },[value])

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };  
      
  return (
    <div>
      <div onClick={handleClickOpen}>
        Deletar usuário
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{background:"",width:"100%"}}
      >
        <DialogTitle id="alert-dialog-title">
          Deletar usuario
        </DialogTitle>
        <DialogContent sx={dialogStyle}>
          <DialogContentText 
            id="alert-dialog-description" 
            sx={{display:"flex",flexDirection:"column"}}
            >
               <div style={{marginTop:"12px"}}>
                    <Box sx={{ minWidth: 100 }}>
                        <FormControl sx={{ m: "5px 0px", minWidth: "100%" }} size="small">
                            <InputLabel id="demo-simple-select-label">Usuarios</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Usuarios"
                            size='small'
                            onChange={handleChange}
                            >
                                { usuarios?.map((e,key)=>{
                                    return <MenuItem value={e.id}>{e.nome}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
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
