import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ModalPagarPremiasao({finalizarTemporada}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmar = ()=>{      
    finalizarTemporada()
    handleClose() 
  }

  return (
    <div>
        <Button 
        variant='outlined' size='small'
        sx={{margin:"20px 0px",height:"40px",marginTop:"auto", width:"100%"}}
        onClick={handleClickOpen}
        >
        Encerrar temporada
        </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Deseja realmente finalizar a temporada?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             Ao finalizar, as premiações serâo pagas somente se houver dados selecionados!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmar}>Confirmar</Button>
          <Button color='error' onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
