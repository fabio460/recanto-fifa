import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {listaDeUsuarios} from "../../Uteis" 
import { useDispatch } from 'react-redux/es/exports';
import { TextField } from '@mui/material';
import { listaDeUsuariosApi } from '../../api';
export default function ModalVitoriasEGols() {
  const [open, setOpen] = React.useState(false);
  const [Gols, setGols] = useState([])
  const [Empates, setEmpates] = useState([])
  const [Vitorias, setVitorias] = useState([])

  const [usuarios, setListaDeUsuarios] = React.useState([])

  async function getUsuarios() {
    const u = await listaDeUsuariosApi()
    setListaDeUsuarios(u)
  }
  React.useEffect(()=>{
    getUsuarios()
  },[])

  const dispatch = useDispatch()
  const handleClose = () => {
    setOpen(false);
  };

  const dialogStyle = {
    width:"600px",
    "@media (max-width:800px)":{
      width:"100%"
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
 const handleGols = (gols,nome)=>{
   let filtro = Gols.filter(e=>{
    if (e.nome !== nome) {
        return e
    }
   }) 
   setGols([...filtro,{gols:parseInt(gols),nome,item:"gols"}])
 }

 const handleEmpates = (empates,nome)=>{
    let filtro = Empates.filter(e=>{
     if (e.nome !== nome) {
         return e
     }
    }) 
    setEmpates([...filtro,{empates:parseInt(empates),nome,item:"empates"}])
  }

  const handleVitorias = (vitorias,nome)=>{
    let filtro = Vitorias.filter(e=>{
     if (e.nome !== nome) {
         return e
     }
    }) 
    setVitorias([...filtro,{vitorias:parseInt(vitorias),nome,item:"vitorias"}])

  }
  

dispatch({
    type:"dados",
    payload:{dados:{
        gols:Gols,
        vitorias:Vitorias,
        empates:Empates
    }}
  })


  return (
    <div>
      <div onClick={handleClickOpen}>
        Gols e vitórias
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{background:"",width:"100%"}}
      >
        <DialogTitle id="alert-dialog-title">
          Insira dados do torneio
        </DialogTitle>
        <DialogContent sx={dialogStyle}>
          <DialogContentText id="alert-dialog-description" >
            gols = {Gols.nome}, {Gols.gols}
            {usuarios.map((u,key)=>{
                return (
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
                        <div style={{width:"130px"}}>
                          {u.nome}
                        </div>
                        <TextField 
                          size='small'
                          label="gols" 
                          sx={{margin:1}}
                          onChange={e=> handleGols(e.target.value,u.nome)}
                        />
                        <TextField 
                           size='small' 
                           label="vitórias" 
                           sx={{margin:1}}
                           onChange={e=> handleVitorias(e.target.value,u.nome)}
                        />
                        <TextField 
                            size='small' 
                            label="empates" 
                            sx={{margin:1}}
                            onChange={e=> handleEmpates(e.target.value,u.nome)}
                        />
                    </div>
                )
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Confirmar</Button>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
