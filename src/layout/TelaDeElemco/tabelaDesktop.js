import React,{useState, useEffect} from 'react'
import ModalDispensarJogador from './modalDispensarJogador'
import ModalTransferirJogador from './modalTransferirJogador'
import  flecha from "../imagens/flecha.jpg"
import { formatoMonetario, removeNome } from '../../Uteis'
import Checkbox from '@mui/material/Checkbox';
import { Button } from 'react-bootstrap'
import { deletarJogadorApi } from '../../Api/jogadoresApi'
import { adicionarSaldoApi } from '../../Api/usuariosApi'
import { CircularProgress } from '@mui/material'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function TabelaDesktop({ordenarLista, jogadores, usuario, carregando}) {
  const [selecionado, setSelecionado] = useState([{id:"", select:false, key:0}])
  const [carregandoDeleteEmMassa, setCarregando] = useState(false)
  let ids = selecionado.map(e=>e.id)
  ids = [...new Set(ids)]

  let checados = selecionado.filter(c=>{
    if (c.select && c.id !== "") {
      return c
    }
  })
  let noChecados = selecionado.filter(s=>{
    if (!s.select && s.id !== "") {
      return s
    }
  })

function subtrairArrays(arr1, arr2) {
  let arr3 = arr1;
  for(let it2 in arr2){
    for(let it1 in arr1){
       if(arr2[it2].id === arr1[it1].id && arr2[it2].select !== arr1[it1].select){
          arr3.splice(it1, 1);
          break; // se achou, não precisa continuar o loop
       }
    }
  }
  return arr3
}
let listaDeSelecionados = subtrairArrays(checados, noChecados)

const dispensarJogadoresEmMassa = ()=>{
  setCarregando(true)
  const  total = listaDeSelecionados.reduce((acc, item)=>{
    return acc + item.valor
  },0)
  console.log(total)
  listaDeSelecionados.map(d=>{
    deletarJogadorApi(d.id)
  })
  adicionarSaldoApi(usuario.id,usuario.saldo + total)
  
  setTimeout(() => {    
    window.location.reload()
  }, 2000);
}

function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className='btn btn-danger ' style={{visibility:listaDeSelecionados.length === 0 && "hidden"}} onClick={handleClickOpen}>Dispensar selecionados</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Dispensar jogadores selecionados"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Deseja dispensar os jogadores selecionados? clique em confirmar.
           Esta ação não poderá ser revertida
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className='btn btn-success' onClick={dispensarJogadoresEmMassa}>Confirmar</Button>
          <Button className='btn btn-danger' onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
  return (
    <div className='tabelaDeElencos'>
    <table className="table">
        <thead className="thead-dark">
            <tr>
                <th></th>
                <th id={1} onClick={ordenarLista} scope="col" className='tabelaDeElencosTH'>
                  Nome 
                  <img src={flecha} className='arrowImg arrowDown' id='1'/>
                </th>
                <th id={2} onClick={ordenarLista} scope="col"  className='tabelaDeElencosTH'>
                  Posição
                  <img src={flecha} className='arrowImg arrowDown' id='2'/>
                </th>
                <th id={3} onClick={ordenarLista}  className='tabelaDeElencosTH'  scope="col">
                  Overall
                  <img src={flecha} className='arrowImg arrowDown' id='3'/>
                </th>
                <th id={4} onClick={ordenarLista} className='tabelaDeElencosTH' scope="col">
                  Salário
                  <img src={flecha} className='arrowImg arrowDown' id='4'/>
                </th>
                <th  id={5} onClick={ordenarLista} scope="col"  className='tabelaDeElencosTH'>
                  Clube
                  <img src={flecha} className='arrowImg arrowDown' id='1'/>
                </th>
                <th scope="col" className='elencoBtns'> 
                  {
                    carregandoDeleteEmMassa ? 
                    <Button className='btn btn-danger '>Carregando...</Button>:
                    <AlertDialog/>
                    }
                  
                </th>
            </tr>
        </thead>
        <tbody>
          {jogadores?.map((elem,key)=>{
            return(
                <tr className='tr'>
                    <td> 
                       <Checkbox sx={{margin:0, padding:0}} onChange={(e)=> setSelecionado([...selecionado ,{
                         id:elem.id, select:e.target.checked, key, valor:elem.OVER >= 90 ? (elem.valor)*0.6 : (elem.valor)*0.4}])
                       }/>
                    </td>
                    <td className='elencoTdNome'>{elem.label}</td>
                    <td className='elencoTdPosicao'>
                      {removeNome(elem.Posicao)}
                    </td>
                    <td className='elencoTdOver'>{elem.OVER}</td>
                    <td className='elencoTdPreco'>{formatoMonetario(elem.valor)}</td>
                    <td className='elencoTdClube'>{elem.CLUBE}</td>
                    <td className='elencoBtns' >
                      <ModalDispensarJogador jogador={elem} usuario={usuario} carregando={carregando}/>  
                      <ModalTransferirJogador id={elem.id} usuario={usuario} jogador={elem.label} carregando={carregando}/>
                    </td>
                </tr>
            )
          })}
        </tbody>
    </table>
</div>
  )
}
