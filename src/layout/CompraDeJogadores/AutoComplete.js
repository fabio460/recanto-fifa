import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { lista } from '../../Lista'
export default function AutoComplete({ value, setValue}) {
    // separando a lista por times
    var clubesComRepetocoes = []
    lista.map((elem,key)=>{
      clubesComRepetocoes.push(elem.CLUBE)   
    })
    const clubes = [...new Set(clubesComRepetocoes)]
  return (
    <div>
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
            id="combo-box-demo"
            options={clubes}
            sx={{ width: "100%"}}
            renderInput={(params) => <TextField {...params} label="Selecione o clube" size='small'/>}
        />
    </div>
  )
}
