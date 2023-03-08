import React,{useEffect, useState} from 'react'
import "./ranking.css"
import {useDispatch, useSelector} from 'react-redux'
import { Button, CircularProgress } from '@mui/material'
import { adicionarSaldoApi, selecionarTemporadaApi } from '../../api'
export default function Ranking({Lista}) {
  const colocacao = useSelector(state=>state.colocacaoRedux.colocacao)  
  const artilharia = useSelector(state=>state.artilhariaRedux.artilheiros)
  const assistente = useSelector(state=>state.assisteciaReducer.assistentes)
  const dados = useSelector(state=>state.golsEmpVitoriasRedux.dados)
  const dispatch = useDispatch()
  const loading = useSelector(state=>state.loadingReducer.loading)
  
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


  const [Temporada, setTemporada] = useState()

  const finalizarTemporada = async()=>{

     await adicionarSaldoApi(colocacao.primeiro,campeao,dispatch, loading)
     await adicionarSaldoApi(colocacao.segundo,viceCampeao,dispatch, loading)
     await adicionarSaldoApi(colocacao.terceiro,terceiroColocado,dispatch, loading)
     await adicionarSaldoApi(colocacao.quarto,quartoColocado,dispatch, loading)
     
     await adicionarSaldoApi(buscaUsuarioPeloJogador(artilharia.primeiro),artilheiro, dispatch, loading)
     await adicionarSaldoApi(buscaUsuarioPeloJogador(artilharia.segundo),viceArtilheiro, dispatch, loading)
     await adicionarSaldoApi(buscaUsuarioPeloJogador(artilharia.terceiro),terceiroArtilheiro, dispatch, loading)
     

     await adicionarSaldoApi(buscaUsuarioPeloJogador(assistente.primeiro),assistencia, dispatch, loading)
     await adicionarSaldoApi(buscaUsuarioPeloJogador(assistente.segundo),viceAssistencia, dispatch, loading)
     await adicionarSaldoApi(buscaUsuarioPeloJogador(assistente.terceiro),terceiroAssistencia, dispatch, loading)

     setTimeout(() => {        
        dados.gols?.map(async(e,key)=>{
          await adicionarSaldoApi(e.nome,(gols)*e.gols,dispatch, loading)
        })  
        setTimeout(() => {         
          dados.vitorias?.map(async(e,key)=>{
            await adicionarSaldoApi(e.nome,(vitoria)*e.vitorias,dispatch, loading)
          })
          setTimeout(() => {         
            dados.empates?.map(async(e,key)=>{
              await adicionarSaldoApi(e.nome,(empates)*e.empates,dispatch, loading)
            })
            alert("temporada finalizada com sucesso!")
            window.location.reload()
            if (colocacao.primeiro) {
              alert("O usuário "+colocacao.primeiro+" ganhou o torneio")
            }
          }, 1000);
        }, 1000);
      }, 1000);
    }
   
 

  function buscaUsuarioPeloJogador(jogador) {
    let n = ''
    Lista?.map(use=>{
       let sim = use.jogadore.find(e=>{
        if (e.label === jogador) {
          return true
        }
       })
       if (sim) {
        n = use.nome
       }
    })
    return n
  }
  
  async function SelecionarTemporada() {
    const t = await selecionarTemporadaApi()
    console.log(t)
    setTemporada(t)
  }
  useEffect(()=>{
     SelecionarTemporada()
  },[])
 
  return (
    <div>
      <div>Temporada {Temporada?.numero}</div>
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
          <h3>Assistências</h3>
          <ol>
            <li>{assistente.primeiro}</li>
            <li>{assistente.segundo}</li>
            <li>{assistente.terceiro}</li>
            <li>{assistente.quarto}</li>
          </ol>
        </div>
        <div>
          <h3>Quantidade de gols</h3>
          {dados.gols?.map((e,key)=>{
            return<div>{e.nome} - {e.gols}</div>
          })}
        </div>
        <div>
          <h3>Quantidade de vitorias</h3>
          {dados.vitorias?.map((e,key)=>{
            return<div>{e.nome} - {e.vitorias}</div>
          })}
        </div>
        <div>
          <h3>Quantidade de empates</h3>
          {dados.empates?.map((e,key)=>{
            return<div>{e.nome} - {e.empates}</div>
          })}

        </div>
        <div></div>
        <Button 
          variant='outlined' size='small'
          sx={{margin:"20px 0px",height:"40px",marginTop:"auto", width:"100%"}}
          onClick={finalizarTemporada}
        >
          Encerrar temporada
        </Button>
      </div>
    </div>
  )
}
