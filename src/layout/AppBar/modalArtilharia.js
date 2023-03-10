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
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux/es/exports';
export default function ModalArtilharia({participantes}) {
  
  const [open, setOpen] = React.useState(false);
  const [primeiro, setPrimeiro] = React.useState('');
  const [segundo, setSegundo] = React.useState('');
  const [terceiro, setTerceiro] = React.useState('');
  const [quarto, setQuarto] = React.useState('');

  const handleChangePrimeiro = (event) => {
    setPrimeiro(event.target.value);
  };
  const handleChangeSegundo = (event) => {
    setSegundo(event.target.value);
  };
  const handleChangeTerceiro = (event) => {
    setTerceiro(event.target.value);
  };
  const handleChangeQuarto = (event) => {
    setQuarto(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch()
  const handleClose = () => {
    setOpen(false);
    dispatch({
      type:"artilharia",
      payload:{artilheiros:{primeiro,segundo,terceiro,quarto}}
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
        Artilharia
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
                {participantes?.map((elem,key)=>{
                  return elem.selecionado.jogadore?.map((e,key)=>{
                    return <MenuItem value={e.label}>{e.label}</MenuItem>
                  })
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
                {participantes?.map((elem,key)=>{
                  return elem.selecionado.jogadore?.map((e,key)=>{
                    return <MenuItem value={e.label}>{e.label}</MenuItem>
                  })
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
                {participantes?.map((elem,key)=>{
                  return elem.selecionado.jogadore?.map((e,key)=>{
                    return <MenuItem value={e.label}>{e.label}</MenuItem>
                  })
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
                {participantes?.map((elem,key)=>{
                  return elem.selecionado.jogadore?.map((e,key)=>{
                    return <MenuItem value={e.label}>{e.label}</MenuItem>
                  })
                })}
              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Confirmar</Button>
          <Button color='error' onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
