import React,{useEffect, useState} from 'react'
import "./ranking.css"
import {useDispatch, useSelector} from 'react-redux'
import { Button, CircularProgress } from '@mui/material'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { adicionarSaldoApi, alterarBugadoApi, alterarSaldoApi, alterarTemporadaApi, bugadoPrataBronze, bugadoPrataBronzeApi, listaDeUsuariosApi, pagarFolhaApi, selecionarTemporadaApi } from '../../api'
import ModalPagarPremiasao from './modalPagarPremisao'
import ModalPagarFolha from './modalPagarFolha'
import { buscaUsuarioPeloJogador, CalculaBugado } from '../../Uteis'
import ListaDeParticipantes from './listaDeParticipantes';



export default function Ranking({Lista, temporada}) {
  
  const colocacao = useSelector(state=>state.colocacaoRedux.colocacao)  
  const artilharia = useSelector(state=>state.artilhariaRedux.artilheiros)
  const assistente = useSelector(state=>state.assisteciaReducer.assistentes)
  const dados = useSelector(state=>state.golsEmpVitoriasRedux.dados)
  const dispatch = useDispatch()
  const loading = useSelector(state=>state.loadingReducer.loading)
  
  var premioOuro = []
  var premioPrata = ["Felipe","Felipe","Rafael","Felipe"]
  var premioBronze = ["José","Rafael","Rafael","Rafael","Felipe"]
  useEffect(()=>{
  },[colocacao])
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

  const [Temporada, setTemporada] = useState([])
  var arrayPagamento = []
  var arrayNome = []
  let pagamento = []
  const finalizarTemporada = async()=>{
    handlePagamentos(colocacao.primeiro,campeao,dispatch, loading)
    handlePagamentos(colocacao.segundo,viceCampeao,dispatch, loading)
    handlePagamentos(colocacao.terceiro,terceiroColocado,dispatch, loading)
    handlePagamentos(colocacao.quarto,quartoColocado,dispatch, loading)
    handlePagamentos(buscaUsuarioPeloJogador(artilharia.primeiro, Lista),artilheiro, dispatch, loading)
    handlePagamentos(buscaUsuarioPeloJogador(artilharia.segundo, Lista),viceArtilheiro, dispatch, loading)
    handlePagamentos(buscaUsuarioPeloJogador(artilharia.terceiro, Lista),terceiroArtilheiro, dispatch, loading)
    handlePagamentos(buscaUsuarioPeloJogador(assistente.primeiro, Lista),assistencia, dispatch, loading)
    handlePagamentos(buscaUsuarioPeloJogador(assistente.segundo, Lista),viceAssistencia, dispatch, loading)
    handlePagamentos(buscaUsuarioPeloJogador(assistente.terceiro, Lista),terceiroAssistencia, dispatch, loading)
    
    dados.gols?.map(async(e,key)=>{
      handlePagamentos(e.nome,(gols)*e.gols,dispatch, loading)
    }) 

    dados.vitorias?.map(async(e,key)=>{
      handlePagamentos(e.nome,(vitoria)*e.vitorias,dispatch, loading)
    })
    dados.empates?.map(async(e,key)=>{
      handlePagamentos(e.nome,(empates)*e.empates,dispatch, loading)
    })


    let Usuarios = selecionarUsuariosPagamento(arrayNome)
    let UsuariosDaLista = []
    Usuarios.map(a=>{
      let aux = Lista.filter(e=>{
        if (e.nome === a) {
          UsuariosDaLista.push(e)
          return e
        }
      })
     
    })
    Usuarios.map(e=>{
      let soma = 0
      arrayPagamento.map(u=>{
        if (e === u.nome) {
          soma+= u.valor
        }
      })
      let usuario = {nome:e,soma}
     
      UsuariosDaLista.map(u=>{
        if (u.nome === usuario.nome) {
          return pagamento.push({
            id: u.id,
            total: u.saldo + soma
          })
        }
      })
     
    })
    
    function handlePagamentos(nome, valor) {
      if (nome !== '') {     
        arrayPagamento.push({nome, valor})
        arrayNome.push(nome)
      }
    }
    
    function selecionarUsuariosPagamento(array) {
      return [... new Set(array)]
    }

    alterarSaldoApi(pagamento, dispatch, temporada, pagarFolha)
    alterarTemporadaApi()
    pagamento = []
 
    // setTimeout(() => {   
    //   Lista.map(async(usuario)=>{
    //     let obj = CalculaBugado(usuario.nome,premioOuro,"ouro", usuario.id)
    //     await alterarBugadoApi(obj.id, obj.premio, obj.contador)
    //   })
    //   dados.gols?.map(async(e,key)=>{
    //     handlePagamentos(e.nome,(gols)*e.gols,dispatch, loading)
    //   })  
    //   setTimeout(() => {         
    //     dados.vitorias?.map(async(e,key)=>{
    //       handlePagamentos(e.nome,(vitoria)*e.vitorias,dispatch, loading)
    //     })
    //     setTimeout(() => {         
    //       dados.empates?.map(async(e,key)=>{
    //         handlePagamentos(e.nome,(empates)*e.empates,dispatch, loading)
    //       })
    //       if (BugadoBronze) {
    //         bugadoPrataBronzeApi(BugadoBronze,"bronze")
    //       }
           
    //       if (BugadoPrata) {
    //         bugadoPrataBronzeApi(BugadoPrata,"prata")
    //       }
    //       if (temporada.numero === 2) {
    //         pagarFolha()
    //       }
    //       alterarTemporadaApi()
    //       alert("temporada finalizada com sucesso!")
    //       window.location.reload()
    //       if (colocacao.primeiro) {
    //         alert("O usuário "+colocacao.primeiro+" ganhou o torneio")
    //       }
    //     }, 1000);
    //   }, 1000);
    // }, 1000);
  }

  
  const participantes = useSelector(state=>state.participantesReducer.participantes)
  async function pagarFolha() {
     if (participantes.length === 0) {
       alert("não há participantes selecionados")
     }
     participantes?.map(e=>{
      let soma = 0
      e.selecionado.jogadore?.map(j=>{
        soma+= j.valor
      })
      let total = soma*0.03
      let novoSaldo = e.selecionado.saldo - total
      pagarFolhaApi(e.selecionado.id, novoSaldo)
     })
  }  
 

  
  return (
    <div>
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
              <div>
                <h3>Bugado prata e bronze</h3>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth sx={{ m: "10px 0px", minWidth: "100%" }} size="small">
                    <InputLabel id="demo-simple-select-label">3 Hash trick</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={BugadoBronze}
                      label="BugadoBronze"
                      onChange={handleBugadoBronze}
                    >
                      <MenuItem value={null}>---</MenuItem>
                      {participantes?.map(item=>{
                        return  <MenuItem value={item.id}>{item.nome}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth sx={{ m: "", minWidth: "100%" }} size="small">
                    <InputLabel id="demo-simple-select-label">3 part sem sofrer gols</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={BugadoPrata}
                      label="BugadoBronze"
                      onChange={handleBugadoPrata}
                    >
                      <MenuItem value={null}>---</MenuItem>
                      {participantes?.map(item=>{
                        return  <MenuItem value={item.id}>{item.nome}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </div>
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
