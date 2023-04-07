import React,{useEffect, useState} from 'react'
import "./ranking.css"
import {useDispatch, useSelector} from 'react-redux'
import { Button, Checkbox, CircularProgress, FormControlLabel, FormGroup } from '@mui/material'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { adicionarSaldoApi, alterarBugadoApi, bugadoPrataBronze, bugadoPrataBronzeApi, getTemporadaApi, listaDeUsuariosApi, selecionarTemporadaApi } from '../../Api/usuariosApi'
import ModalPagarPremiasao from './modalPagarPremisao'
import ModalPagarFolha from './modalPagarFolha'
import { buscaUsuarioPeloJogador, CalculaBugado } from '../../Uteis'
import ListaDeParticipantes from './listaDeParticipantes';
import { dadosDePagamento, getPremiacoesBugados, removerArraysRepetidos, setPremiacao } from './servicos';
import { alterarTemporadaApi } from '../../Api/temporadasApi';
import { pagarFolhaApi, pagarPremiacao, pagarPremioBugadoApi } from '../../Api/pagamentosApi';
import Carregando from './carregando';
import { listarEstatisticasApi } from '../../Api/estatisticasApi';
import Vencedores from '../Graficos/vencedores';
import { setarStatisticaApi } from '../../Api/estatisticasApi';
import Artilheiros from '../Graficos/artilheiros';
import Assistentes from '../Graficos/assistentes';


export default function Ranking({Lista, temporada}) {
  
  const colocacao = useSelector(state=>state.colocacaoRedux.colocacao)  
  const artilharia = useSelector(state=>state.artilhariaRedux.artilheiros)
  const assistente = useSelector(state=>state.assisteciaReducer.assistentes)
  const dados = useSelector(state=>state.golsEmpVitoriasRedux.dados)
  const participantes = useSelector(state=>state.participantesReducer.participantes)
  const dispatch = useDispatch()
  const loading = useSelector(state=>state.atualizarTudo.atualizado)
const [carregando, setCarregando] = useState(false)
  var premioOuro = []
  var premioPrata = ["Felipe","Felipe","Rafael","Felipe"]
  var premioBronze = ["José","Rafael","Rafael","Rafael","Felipe"]

  premioOuro.push(colocacao.primeiro)
  premioOuro.push(buscaUsuarioPeloJogador(artilharia.primeiro, Lista))
  premioOuro.push(buscaUsuarioPeloJogador(artilharia.segundo, Lista))

  const campeao = 30000;
  const viceCampeao = 15000;
  const terceiroColocado = 7500;
  const quartoColocado = 3500;
  const artilheiro = 15000;
  const viceArtilheiro = 7500;
  const terceiroArtilheiro = 3500;
  const gols = 50;
  const vitoria = 1500;
  const empates = 750;
  const assistencia = 15000;
  const viceAssistencia = 7500;
  const terceiroAssistencia = 3500;

 
  const [BugadoBronze, setBugadoBronze] = React.useState();
  const handleBugadoBronze = (event) => {
    setBugadoBronze(event.target.value);
  }; 

  const [BugadoPrata, setBugadoPrata] = React.useState();
  const handleBugadoPrata = (event) => {
    setBugadoPrata(event.target.value);
  }; 

  var usuariosPremiados = []
  
  const [checadoA, setChecadoA] = React.useState([])
  const [checadoB, setChecadoB] = React.useState([])

  const handleChecadoA = (u, e)=>{
    if (checadoA.length === 0) {
      setChecadoA([... checadoA, {bugado:"prata",dados:u,nome:u.nome,checked:e.checked}])  
    }else{
      let novoChecadoA = checadoA.filter(item=>{
          if (item.nome !== u.nome) {
            return item
          }
      })
      setChecadoA([... novoChecadoA, {bugado:"prata",dados:u,nome:u.nome,checked:e.checked}])
    }
  }
  const handleChecadoB = (u, e)=>{
    if (checadoB.length === 0) {
      setChecadoB([... checadoB, {bugado:"bronze",dados:u,nome:u.nome,checked:e.checked}])  
    }else{
      let novoChecadoB = checadoB.filter(item=>{
          if (item.nome !== u.nome) {
            return item
          }
      })
      setChecadoB([... novoChecadoB, {bugado:"bronze",dados:u,nome:u.nome,checked:e.checked}])
    }
  }
 
 

  const finalizarTemporada = async()=>{
    getPremiacoes(colocacao.primeiro,campeao)
    getPremiacoes(colocacao.segundo,viceCampeao)
    getPremiacoes(colocacao.terceiro,terceiroColocado)
    getPremiacoes(colocacao.quarto,quartoColocado)
    getPremiacoes(buscaUsuarioPeloJogador(artilharia.primeiro, Lista),artilheiro)
    getPremiacoes(buscaUsuarioPeloJogador(artilharia.segundo, Lista),viceArtilheiro)
    getPremiacoes(buscaUsuarioPeloJogador(artilharia.terceiro, Lista),terceiroArtilheiro)
    getPremiacoes(buscaUsuarioPeloJogador(assistente.primeiro, Lista),assistencia)
    getPremiacoes(buscaUsuarioPeloJogador(assistente.segundo, Lista),viceAssistencia)
    getPremiacoes(buscaUsuarioPeloJogador(assistente.terceiro, Lista),terceiroAssistencia)
    dados.gols?.map(e=> getPremiacoes(e.nome,(gols)*e.gols)) 
    dados.vitorias?.map(e=> getPremiacoes(e.nome,(vitoria)*e.vitorias))
    dados.empates?.map(e=> getPremiacoes(e.nome,(empates)*e.empates))

    function getPremiacoes(nome, valor) {
      if (nome) {     
        usuariosPremiados.push({nome, valor})
      }
    }
    
    let arrayDePremiadosDoBugado = getPremiacoesBugados(
        checadoA,
        checadoB,
        colocacao.primeiro, 
        buscaUsuarioPeloJogador(artilharia.primeiro, Lista),
        buscaUsuarioPeloJogador(artilharia.segundo, Lista),
        Lista
    )
    //console.log(setPremiacao(usuariosPremiados, Lista))
    //pagarPremioBugadoApi(arrayDePremiadosDoBugado)
    if (setPremiacao(usuariosPremiados, Lista).length === 0) {
      alert("não há premiaçôes selecionadas")
    }else{
      setCarregando(true)
      const lista = await listaDeUsuariosApi()
      setarStatisticaApi(colocacao.primeiro, artilharia.primeiro, assistente.primeiro, dispatch, loading)
      pagarPremiacao(setPremiacao(usuariosPremiados, lista), dispatch, loading)
      alterarTemporadaApi(dispatch, loading)
      
      setTimeout(() => {
        alert("Temporada finalizada com sucesso com o "+colocacao.primeiro+" campeão!")
        window.location.reload() 
      }, 2000);
      usuariosPremiados = []
      //alert("Temporada finalizada com sucesso com o "+colocacao.primeiro+" campeão!")
    }     
  }
  
  function pagarFolha() {
    if (participantes.length === 0) {
      alert("não há participantes selecionados")
    }else{
      let usuariosParaPagar = []
      participantes?.map(e=>{
      let soma = 0
      e.selecionado.jogadore?.map(j=>{
        soma+= j.valor
      })
      let total = soma*0.03
      let novoSaldo = e.selecionado.saldo - total
      usuariosParaPagar.push({
        id: e.selecionado.id, novoSaldo
      })
      })
      pagarFolhaApi(usuariosParaPagar)
      setCarregando(true)
    }
  }  

  return (
    <div>
      {carregando && <div className='carregandoRanking'>
          <div className='carregandoRankingContent'><Carregando/></div>
      </div>}
      {
        temporada && 
        <div>
          <h1 className='rankingTituloTemporada' style={{color:temporada?.numero ===1 ?"green":"red"}}> Temporada {temporada?.numero}</h1>
          <div className='rankingContainer'>
            <div className='rankingAside'>
              <ListaDeParticipantes ListaDeUsuarios={Lista}/>
            </div>
            <div className='rankingMain'>
              <div>
                <h5>Colocação</h5>
                <ol>
                  <li>{colocacao.primeiro}</li>
                  <li>{colocacao.segundo}</li>
                  <li>{colocacao.terceiro}</li>
                  <li>{colocacao.quarto}</li>
                </ol>
              </div>
              <div>
                <h5>Atilharia</h5>
                <ol>
                  <li>{artilharia.primeiro}</li>
                  <li>{artilharia.segundo}</li>
                  <li>{artilharia.terceiro}</li>
                  <li>{artilharia.quarto}</li>
                </ol>
              </div>
              <div>
                <h5>Assistências</h5>
                <ol>
                  <li>{assistente.primeiro}</li>
                  <li>{assistente.segundo}</li>
                  <li>{assistente.terceiro}</li>
                  <li>{assistente.quarto}</li>
                </ol>
              </div>
              <div>
                <h5>Quantidade de gols</h5>
                {dados.gols?.map((e,key)=>{
                  return<div>{e.nome} - {e.gols}</div>
                })}
              </div>
              <div>
                <h5>Quantidade de vitorias</h5>
                {dados.vitorias?.map((e,key)=>{
                  return<div>{e.nome} - {e.vitorias}</div>
                })}
              </div>
              <div>
                <h5>Quantidade de empates</h5>
                {dados.empates?.map((e,key)=>{
                  return<div>{e.nome} - {e.empates}</div>
                })}
              </div>
              <div></div>
              <div>
                <ModalPagarPremiasao finalizarTemporada={finalizarTemporada}/>
                <ModalPagarFolha pagarFolha={pagarFolha}/>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
