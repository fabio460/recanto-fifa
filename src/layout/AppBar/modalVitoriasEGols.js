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
  let invalido =  (/^(?=.*[ a-zA-Z@#$%º¢£&!'"-+/\(\)\ \`\\\|\{\}\[\]\~\^\:\;\.\, ])/); 
 const handleGols = (gols,nome)=>{
   
  if (invalido.test(gols)) {
    alert("Este campo contem caractere não numerico")
  }else{
    let filtro = Gols.filter(e=>{
     if (e.nome !== nome) {
         return e
     }
    }) 
    setGols([...filtro,{gols:parseInt(gols),nome,item:"gols"}])
  }
 }

 const handleEmpates = (empates,nome)=>{
    if (invalido.test(empates)) {
      alert("Este campo contem caractere não numerico")
    }else{
      let filtro = Empates.filter(e=>{
       if (e.nome !== nome) {
           return e
       }
      }) 
      setEmpates([...filtro,{empates:parseInt(empates),nome,item:"empates"}])
    }
  }

  const handleVitorias = (vitorias,nome)=>{
    if (invalido.test(vitorias)) {
      alert("Este campo contem caractere não numerico")
    }else{
      let filtro = Vitorias.filter(e=>{
       if (e.nome !== nome) {
           return e
       }
      }) 
      setVitorias([...filtro,{vitorias:parseInt(vitorias),nome,item:"vitorias"}])
    }

  }
  

dispatch({
    type:"dados",
    payload:{dados:{
        gols:Gols,
        vitorias:Vitorias,
        empates:Empates
    }}
  })

  const inputStyle = {
    margin:"0px 20px",
    "@media (max-width:800px)":{
      margin:"0px 2px",
      padding:"0px",
    }
  }
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
          <DialogContentText id="alert-dialog-description" sx={{padding:"0px",}}>
            {usuarios?.map((u,key)=>{
                return (
                    <div>
                      <div style={{width:""}}>
                        {u.nome}
                      </div>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                          <TextField 
                            size='small'
                            label="gols" 
                            sx={{}}
                            onChange={e=> handleGols(e.target.value,u.nome)}
                          />
                          <TextField 
                            size='small' 
                            label="vitórias" 
                            sx={inputStyle}
                            onChange={e=> handleVitorias(e.target.value,u.nome)}
                          />
                          <TextField 
                              size='small' 
                              label="empates" 
                              sx={{}}
                              onChange={e=> handleEmpates(e.target.value,u.nome)}
                          />
                      </div>
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
