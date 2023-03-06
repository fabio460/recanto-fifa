import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { adicionarJogadorApi } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ModalComprar({jogador, idUsuario}) {
  const [open, setOpen] = React.useState(false);
  const [valor, setValor] = React.useState()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch()
  const h = useNavigate()
  const comprarJogador = ()=>{
    adicionarJogadorApi(
      jogador.label,
      jogador.Posicao,
      jogador.OVER,
      jogador.CLUBE,
      idUsuario,
      dispatch 
    )
    setTimeout(() => {
      h("/elencos")
      
    }, 500);
    handleClose()
  }
  return (
    <div>
      <div className='btn btn-success ' onClick={handleClickOpen}>
        Comprar 
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Você esta prestes a adiquirir o jogador {jogador.label}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             Insira o valor dele 
             <input onChange={e=>setValor(e.target.value)}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={comprarJogador}>Confirmar</Button>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
