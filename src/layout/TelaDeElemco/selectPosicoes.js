import React,{useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectPosicoes({setPosicoes}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
      setAge(event.target.value);
  };
  
  setPosicoes(age)
  
  return (
    <FormControl sx={{ m: 1, minWidth: "160px" }} size="small">
      <InputLabel id="demo-simple-select-label" >Filtrar posições </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Filtrar posiçôes"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Todas</em>
        </MenuItem>
        <MenuItem value={"ATA"}>Atacantes</MenuItem>
        <MenuItem value={"PD"}>Pont. Direita</MenuItem>
        <MenuItem value={"PE"}>Pont. Esquerda</MenuItem>
        <MenuItem value={"SA"}>Segundo atacante</MenuItem>
        <MenuItem value={"MC"}>Meia</MenuItem>
        <MenuItem value={"MEI"}>Meia atacante</MenuItem>
        <MenuItem value={"ME"}>Meia esquerda</MenuItem>
        <MenuItem value={"MD"}>Meia direita</MenuItem>
        <MenuItem value={"VOL"}>Volantes</MenuItem>
        <MenuItem value={"LD"}>Lateral direita</MenuItem>
        <MenuItem value={"LE"}>Lateral esquerda</MenuItem>
        <MenuItem value={"ADE"}>Ala esquerda</MenuItem>
        <MenuItem value={"ADD"}>Ala direita</MenuItem>
        <MenuItem value={"ZAG"}>Zagueiros</MenuItem>
        <MenuItem value={"GOL"}>Goleiro</MenuItem>
      </Select>
    </FormControl>
  );
}