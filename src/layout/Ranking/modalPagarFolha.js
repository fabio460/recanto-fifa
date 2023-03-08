import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ModalPagarFolha({pagarFolha}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
    };
    
  const confirmar = ()=>{      
    pagarFolha()
    handleClose() 
  }
  return (
    <div>
        <Button 
            variant='outlined' size='small' color='error'
            sx={{margin:"20px 0px",height:"40px",marginTop:"auto", width:"100%"}}
            onClick={handleClickOpen}
        >
        Pagar folha
        </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Cuidado!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>Ao confirmar você estara efetuando o pagamento das folhas.</p>
            <p>Clique em confirmar no botão abaixo </p>
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
