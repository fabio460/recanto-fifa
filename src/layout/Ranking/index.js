import React,{useState} from 'react'
import "./ranking.css"
import {useSelector} from 'react-redux'
import { Button, CircularProgress } from '@mui/material'
import { adicionarSaldoApi } from '../../api'
import { Box } from '@mui/system'
export default function Ranking() {
  const colocacao = useSelector(state=>state.colocacaoRedux.colocacao)  
  const artilharia = useSelector(state=>state.artilhariaRedux.artilheiros)
  const dados = useSelector(state=>state.golsEmpVitoriasRedux.dados)
  const [carregando, setCarregando] = useState(false)
  var saldoRodrigo=100;
  var saldoFabio = 50;
  const finalizarTemporada = async()=>{
     setCarregando(true)
     await adicionarSaldoApi(colocacao.primeiro,30)
     await adicionarSaldoApi(colocacao.segundo,15)
     await adicionarSaldoApi(colocacao.terceiro,7.5)
     await adicionarSaldoApi(colocacao.quarto,3.5)
     
     await dados.gols.map((e,key)=>{
        adicionarSaldoApi(e.nome,1*e.gols)
     })
     setTimeout(() => {      
        dados.vitorias.map((e,key)=>{
         adicionarSaldoApi(e.nome,1*e.vitorias)
       })
     }, 1000);

     setTimeout(() => {     
        dados.empates.map((e,key)=>{
          adicionarSaldoApi(e.nome,1*e.empates)
        })
     }, 2000);
     setTimeout(() => {
      window.location.reload()  
     }, 3000);
  }
  return (
    <div>
      {carregando? 
        <Box sx={{ display: 'flex',justifyContent:"center", alignItems:"center", height:200 }}>
          <CircularProgress />
        </Box>:
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
      
        <Button 
          variant='outlined' size='small'
          sx={{margin:"20px 0px",height:"40px",marginTop:"auto"}}
          onClick={finalizarTemporada}
        >
          Encerrar temporada
        </Button>
      </div>}
    </div>
  )
}
