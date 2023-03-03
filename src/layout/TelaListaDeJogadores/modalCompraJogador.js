import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { adicionarJogadorApi } from '../../api';

export default function ModalComprar({jogador, idUsuario}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const comprarJogador = ()=>{
    adicionarJogadorApi(
      jogador.label,
      jogador.Posicao,
      jogador.OVER,
      jogador.CLUBE,
      idUsuario 
    )
   
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
          Preço do jogador {jogador.salario}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja comprar o jogador  {jogador.label}?
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
