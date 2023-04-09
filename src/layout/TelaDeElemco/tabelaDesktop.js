import React from 'react'
import ModalDispensarJogador from './modalDispensarJogador'
import ModalTransferirJogador from './modalTransferirJogador'
import  flecha from "../imagens/flecha.jpg"
import { formatoMonetario, removeNome } from '../../Uteis'
export default function TabelaDesktop({ordenarLista, jogadores, usuario, carregando}) {
  return (
    <div className='tabelaDeElencos'>
    <table className="table">
        <thead className="thead-dark">
            <tr>
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
                <th scope="col"> </th>
            </tr>
        </thead>
        <tbody>
          {jogadores?.map((elem,key)=>{
            return(
                <tr>
                    <td className='elencoTdNome'>{elem.label}</td>
                    <td className='elencoTdPosicao'>
                      {removeNome(elem.Posicao)}
                    </td>
                    <td className='elencoTdOver'>{elem.OVER}</td>
                    <td className='elencoTdPreco'>{formatoMonetario(elem.valor)}</td>
                    <td className='elencoTdClube'>{elem.CLUBE}</td>
                    <td className='elencoBtns' >
                      {/* <button onClick={()=> despensar(elem.id)} className='btn btn-danger me-3'>Despensar</button> */}
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
