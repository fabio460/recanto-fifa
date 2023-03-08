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
import {listaDeUsuariosApi, transferenciaDeJogadorApi } from '../../api';
export default function ModalTransferirJogador({id, usuario}) {
    const [usuarios, setUsuarios] = useState([])
    const [value, setValue] = React.useState(null);  
    const [open, setOpen] = React.useState(false);
    const [valor, setValor] = useState()
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
        let idUsuario = age
        let invalido =  (/^(?=.*[ a-zA-Z@#$%º¢£&!'"-+/\(\)\ \`\\\|\{\}\[\]\~\^\:\; ])/);   
        let valorComVirgula = valor.replace(",",".")
  
         if (valor < 0 ) {
          alert("valor não pode ser negativo")
         } else {
           if (invalido.test(valor)) {
              alert("Este campo contem caractere não numerico")
           } else {
             if (valor === "" || !valor) {
              alert("Este campo não pode estar em branco")
             } else {
               transferenciaDeJogadorApi(id, idUsuario, parseFloat(valorComVirgula))
             }
           }
         }       
    }

    async function getUsuarios() {
        const p =await listaDeUsuariosApi()
        const l = p.filter(e=>{
          if (e.nome !== usuario.nome) {
            return e
          }
        })
        setUsuarios(l)
        
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
      <button onClick={handleClickOpen} className='btn btn-success ms-3'>Transferir</button>           
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{background:"",width:"100%"}}
      >
        <DialogTitle id="alert-dialog-title">
           Deseja realmente transferir ?
           
        </DialogTitle>
        <DialogContent sx={dialogStyle}>
          <DialogContentText 
            id="alert-dialog-description" 
            sx={{display:"flex",flexDirection:"column",minHeight:200}}
            >
               <div style={{}}>
                
                    <Box sx={{ minWidth: 100 }}>
                        <FormControl sx={{ m: "5px 0px", minWidth: "100%" }} size="small">
                            <InputLabel id="demo-simple-select-label">Transferir para</InputLabel>
                            <Select
                              sx={{}}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={age}
                              size="small"
                              label="Transferir para"
                              onChange={handleChange}
                            >
                                { usuarios?.map((e,key)=>{
                                    return <MenuItem value={e.id}>{e.nome}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <TextField onChange={e=>setValor(e.target.value)} label="Valor da transferência" size='small' sx={{marginTop:"12px", width:"100%"}}/>

                    </Box>
                </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Confirmar}>Confirmar</Button>
          <Button onClick={handleClose} autoFocus color='error'>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
