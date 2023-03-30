import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deletarTodasStatisticasApi } from '../../Api/estatisticasApi';

export default function ModalDeletarEstatistica() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

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
        deletarTodasStatisticasApi()
        handleClose()
    }
      
  return (
    <div>
      <div onClick={handleClickOpen}>
        Deletar dados estatísticos
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{background:"",width:"100%"}}
      >
        <DialogTitle id="alert-dialog-title">
          Deletar dados
        </DialogTitle>
        <DialogContent sx={dialogStyle}>
          <DialogContentText 
            id="alert-dialog-description" 
            sx={{display:"flex",flexDirection:"column"}}
            >
               <div style={{marginTop:"12px"}}>
                   Ao confirmar voçê estará apagando todos os dados estatísticos,
                    esta ação não poderá ser revertida!
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
