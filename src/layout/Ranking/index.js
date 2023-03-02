import React from 'react'
import "./ranking.css"
import {useSelector} from 'react-redux'
import { Button } from '@mui/material'
export default function Ranking() {
  const colocacao = useSelector(state=>state.colocacaoRedux.colocacao)  
  const artilharia = useSelector(state=>state.artilhariaRedux.artilheiros)
  const dados = useSelector(state=>state.golsEmpVitoriasRedux.dados)
  return (
    <div className='rankingContainer'>
      <div>
        <h3>Colocação</h3>
        <ol>
          <li>{colocacao.primeiro}</li>
          <li>{colocacao.segundo}</li>
          <li>{colocacao.terceiro}</li>
          <li>{colocacao.quarto}</li>
        </ol>
      </div>
      <div>
        <h3>Atilharia</h3>
        <ol>
          <li>{artilharia.primeiro}</li>
          <li>{artilharia.segundo}</li>
          <li>{artilharia.terceiro}</li>
          <li>{artilharia.quarto}</li>
        </ol>
      </div>
      <div>
        <h3>Quantidade de gols</h3>
        {dados.gols.map((e,key)=>{
          return<div>{e.nome} - {e.gols}</div>
        })}
      </div>
      <div>
        <h3>Quantidade de vitorias</h3>
        {dados.vitorias.map((e,key)=>{
          return<div>{e.nome} - {e.vitorias}</div>
        })}
      </div>
      <div>
        <h3>Quantidade de empates</h3>
        {dados.empates.map((e,key)=>{
          return<div>{e.nome} - {e.empates}</div>
        })}
        
      </div>
      <Button variant='outlined' sx={{margin:"20px 0px"}}>Encerrar temporada</Button>
    </div>
  )
}
