import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import { getTemporadaApi } from '../../Api/temporadasApi';
import { adicionarJogadorApi, getJogadorPeloNomeApi } from '../../Api/jogadoresApi';
import { CircularProgress } from '@mui/material';

export default function ModalComprar({jogador, idUsuario, Saldo, nomeDoComprador, Usuario}) {
  const [open, setOpen] = React.useState(false);
  const [valor, setValor] = React.useState("")
  const [carregando, setCarregando] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCarregando(false)
    setOpen(false);
  };

  const dispatch = useDispatch()
  const h = useNavigate()
  
  
  const comprarJogador = async()=>{
    
    setCarregando(true)  
    const temporada = await getTemporadaApi()
    let invalido =  (/^(?=.*[ a-zA-Z@#$%º¢£&!'"-+/\(\)\ \`\\\|\{\}\[\]\~\^\:\; ])/); 
    let valorComVirgula = valor.replace(",",".")
    const jogadorDisponivel = await getJogadorPeloNomeApi(jogador.label)
    if (valor >= Saldo) {
      alert("Você não tem saldo suficiente")
      setCarregando(false)
    } else {      
      if (jogadorDisponivel) {
        if (nomeDoComprador === jogadorDisponivel.usuario.nome) {
          alert("Este jogador já esta no seu elenco")
          setCarregando(false)
        } else {     
          alert("Voçê não pode adiquirir este jogador, pois ele pertence ao "
            + jogadorDisponivel.usuario.nome
          )
          setCarregando(false)
        }
      } else {  
        if (valor < 0 ) {
          alert("valor não pode ser negativo")
          setCarregando(false)
         } else {
           if (invalido.test(valor)) {
             alert("Este campo contem caractere não numerico ou numero incompatível")
             setCarregando(false)
            } else {
              if (valor.trim() === "" || valor === undefined || valor === null) {
                alert("Este campo não pode estar em branco")
                setCarregando(false)
              } else {
               if (temporada.numero === 2) {
                setCarregando(true)       
                adicionarJogadorApi(
                  jogador.label,
                  jogador.Posicao,
                  jogador.OVER,
                  jogador.CLUBE,
                  idUsuario,
                  parseFloat(valorComVirgula),
                  dispatch,
                  setCarregando 
                )
               } else {
                 alert("Voçê só pode comprar jogador na temporada 2")
                 setCarregando(false)
               }
               handleClose()
             }
           }
         }  
      }
    }
  }
  const enter = (event)=>{
    if (event.code === "Enter") {
      comprarJogador()
    }
  }
  const folha = Usuario.jogadore.reduce((acum, item)=>{
    return acum + item.valor
  },0)*0.03

  const valorAcrescidoNaFolha = folha + valor*0.03
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
          Ao comprar {jogador.label}, sua folha almentara para {valorAcrescidoNaFolha.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField 
              size='small'
              label="Preço do jogador" 
              onChange={e=>setValor(e.target.value)}
              sx={{width:"100%",margin:"10px 0px"}}
              onKeyUp={e=> enter(e)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            carregando ?  
            <Button  disabled >
              <CircularProgress sx={{width:"20px",height:"20px"}}/>
            </Button>:
            <Button onClick={comprarJogador}>Confirmar</Button>
          }
          <Button color='error' onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
