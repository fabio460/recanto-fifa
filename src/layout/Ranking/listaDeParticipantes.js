import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';

export default function ListaDeParticipantes({ListaDeUsuarios}) {
  const [checado, setChecado] = React.useState([])
  const [participantes, setParticipantes] = React.useState([])

  
  const handleChecado = (u, e)=>{
    setChecado({selecionado:u,nome:u.nome,checked:e.checked})
  }

  function adicionarNaLista(usuario) {
    if (usuario.checked) {
      setParticipantes([...participantes, usuario])
    }else{
      let aux = []
      aux = participantes.filter((elem, key)=>{
         if (elem.nome !== usuario.nome) {
            return elem
         }
      })
      setParticipantes(aux)
    }
  }


  React.useEffect(()=>{
    adicionarNaLista(checado)
  },[checado])

  const dispatch = useDispatch()
  dispatch({
    type:"participantes",
    payload:{participantes}
  })
  console.log(ListaDeUsuarios)
  return (
    <div>
      <h3 className='participantesTitulo'>Participantes</h3>
      <FormGroup sx={{padding:"10px"}}>
        {ListaDeUsuarios?.map((item, key)=>{
          return (
            <FormControlLabel control={<Checkbox onChange={e=>handleChecado(item, e.target)}/>} label={item.nome} disabled={item.saldo < 0 && true}/>
            )
          })}
      </FormGroup>
    </div>
 
  );
}
