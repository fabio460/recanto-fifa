// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';

// export default function ListaDeParticipantes({participantes}) {

//   const participantesMock = [
//     {nome:"Fabio", id:"idFabio"},
//     {nome:"Rodrigo", id:"idrodrigo"}
//   ]
//   const [checked, setChecked] = React.useState([false, false]);

//   console.log(checked)
//   const handleChange1 = (event) => {
//     //setChecked([event.target.checked, event.target.checked]);
//   };

//   const handleChange2 = (event) => {
//     console.log(event.target.id)
//     setChecked([event.target.checked, checked[1]]);
//   };

//   const handleChange3 = (event) => {
//     setChecked([checked[0], event.target.checked]);
//   };

//   const children = (
//     <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
//       {
//         participantes.map((item, key)=>{
//           return (
//             <FormControlLabel
//               label={item.nome}
//               control={<Checkbox id='Fabio' checked={checked[key]} onChange={handleChange1} />}
//             />
//           ) 
//         })
//       }
//     </Box>
//   );

//   return (
//     <div>
//       <h3 className='participantesTitulo'>Participantes</h3>
//       <FormControlLabel
//         label="Parent"
//         control={
//           <Checkbox
//             checked={checked[0] && checked[1]}
//             indeterminate={checked[0] !== checked[1]}
//             onChange={handleChange1}
//           />
//         }
//       />
//       {children}
//     </div>
//   );
// }

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
 
  return (
    <div>
      <h3 className='participantesTitulo'>Participantes</h3>
      <FormGroup sx={{padding:"10px"}}>
        {ListaDeUsuarios?.map((item, key)=>{
          return (
            <FormControlLabel control={<Checkbox onChange={e=>handleChecado(item, e.target)}/>} label={item.nome} />
            )
          })}
      </FormGroup>
    </div>
 
  );
}
