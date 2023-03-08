import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { adicionarJogadorApi, getJogadorPeloNomeApi } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel/InputLabel';

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
  
  
  const comprarJogador = async()=>{
    let invalido =  (/^(?=.*[ a-zA-Z@#$%º¢£&!'"-+/\(\)\ \`\\\|\{\}\[\]\~\^\:\; ])/); 
    let valorComVirgula = valor.replace(",",".")
    const jogadorDisponivel = await getJogadorPeloNomeApi(jogador.label)
    if (jogadorDisponivel) {
      console.log(jogadorDisponivel.usuario.nome)
      alert("Voçê não pode adiquirir este jogador, pois ele pertence ao "+jogadorDisponivel.usuario.nome)
    } else {  
      if (valor < 0 ) {
        alert("valor não pode ser negativo")
       } else {
         if (invalido.test(valor)) {
            alert("Este campo contem caractere não numerico")
         } else {
           if (valor === "" || !valor) {
            alert("Este campo não pode estar em branco")
           } else {
             adicionarJogadorApi(
               jogador.label,
               jogador.Posicao,
               jogador.OVER,
               jogador.CLUBE,
               idUsuario,
               parseFloat(valorComVirgula),
               dispatch 
             )
             setTimeout(() => {
               h("/elencos")
               
             }, 500);
             handleClose()
           }
         }
       }  
    }
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
            <TextField 
              size='small'
              label="Preço do jogador" 
              onChange={e=>setValor(e.target.value)}
              sx={{width:"100%",margin:"10px 0px"}}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={comprarJogador}>Confirmar</Button>
          <Button color='error' onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
