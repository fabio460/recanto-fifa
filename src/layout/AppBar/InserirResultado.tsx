import * as React from 'react';
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
export default function InserirResultado() {
  const [open, setOpen] = React.useState(false);
  const [primeiro, setPrimeiro] = React.useState('');
  const [segundo, setSegundo] = React.useState('');
  const [terceiro, setTerceiro] = React.useState('');
  const [quarto, setQuarto] = React.useState('');
  

  const handleChangePrimeiro = (event: SelectChangeEvent) => {
    setPrimeiro(event.target.value);
  };
  const handleChangeSegundo = (event: SelectChangeEvent) => {
    setSegundo(event.target.value);
  };
  const handleChangeTerceiro = (event: SelectChangeEvent) => {
    setTerceiro(event.target.value);
  };
  const handleChangeQuarto = (event: SelectChangeEvent) => {
    setQuarto(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch()
  const handleClose = () => {
    setOpen(false);
    dispatch({
      type:"colocacao",
      payload:{colocacao:{primeiro,segundo,terceiro,quarto}}
    })
  };

  const dialogStyle = {
    width:"400px",
    "@media (max-width:800px)":{
      width:"100%"
    }
  }
  return (
    <div>
      <div onClick={handleClickOpen}>
        Inserir resultado
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{background:"",width:"100%"}}
      >
        <DialogTitle id="alert-dialog-title">
          Insira a colocação dos times
        </DialogTitle>
        <DialogContent sx={dialogStyle}>
          <DialogContentText id="alert-dialog-description">
            
            <FormControl sx={{ m: "5px 0px", minWidth: "100%" }} size="small">
              <InputLabel id="demo-select-small" >Primeiro lugar</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={primeiro}
                label="Primeiro lugar"
                onChange={handleChangePrimeiro}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {listaDeUsuarios.map((elem,key)=>{
                  return <MenuItem value={elem.nome}>{elem.nome}</MenuItem>
                })}
              </Select>
            </FormControl>

            <FormControl sx={{ m: "5px 0px", minWidth: "100%" }} size="small">
              <InputLabel id="demo-select-small">Segundo lugar</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={segundo}
                label="Segundo lugar"
                onChange={handleChangeSegundo}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {listaDeUsuarios.map((elem,key)=>{
                  return <MenuItem value={elem.nome}>{elem.nome}</MenuItem>
                })}
              </Select>
            </FormControl>

            <FormControl sx={{ m: "5px 0px", minWidth: "100%" }} size="small">
              <InputLabel id="demo-select-small" >Segundo lugar</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={terceiro}
                label="Segundo lugar"
                onChange={handleChangeTerceiro}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {listaDeUsuarios.map((elem,key)=>{
                  return <MenuItem value={elem.nome}>{elem.nome}</MenuItem>
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ m: "5px 0px", minWidth: "100%" }} size="small">
              <InputLabel id="demo-select-small" >Quarto lugar</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={quarto}
                label="Segundo lugar"
                onChange={handleChangeQuarto}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {listaDeUsuarios.map((elem,key)=>{
                  return <MenuItem value={elem.nome}>{elem.nome}</MenuItem>
                })}
              </Select>
            </FormControl>
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
