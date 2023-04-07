import React from 'react'
import Vencedores from './vencedores'
import Artilheiros from './artilheiros'
import Assistencias from './assistentes'
import "./grafico.css"
export default function Graficos() {
  return (
    <div>
        <h3 className='tituloEstatisticas'>Dados estatísticos</h3>
        <div className='graficos'>
            <div className='graficoItem'>
                <div className='cabecacalhoEstatisticas'>Campeões</div>
                <Vencedores/>
            </div>
            <div className='graficoItem'>
                <div className='cabecacalhoEstatisticas'>Artilheiros</div>
                <Artilheiros/>
            </div>
            <div className='graficoItem'>
                <div className='cabecacalhoEstatisticas'>Assintentes</div>
                <Assistencias/> 
            </div>
        </div>
    </div>
  )
}
