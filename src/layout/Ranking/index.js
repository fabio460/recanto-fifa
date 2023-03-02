import React from 'react'
import "./ranking.css"
import {useSelector} from 'react-redux'
export default function Ranking() {
  const colocacao = useSelector(state=>state.colocacaoRedux.colocacao)  
  const artilharia = useSelector(state=>state.artilhariaRedux.artilheiros)
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
    </div>
  )
}
