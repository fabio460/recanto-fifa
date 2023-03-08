import React from 'react'
import { Link } from 'react-router-dom'
import "./Regras.css"
export default function Regras() {
  const regras = [
    "Dispensar jogador - Receba 40% do valor pago pelo jogador abaixo de 89 de overall e 60% acima.",
    "Prêmio bugado ouro - Cupom 50% na compra de jogador",
    "Prêmio bugado prata - Cupom 40% na compra de jogador",
    "Prêmio bugado bronze - Cupom 25% na compra de jogador",
    "Bugado ouro - Combinação única de lider, artilheiro e vice-artilheiro(sem ninguem empatado)",
    "Bugado prata - 3 partidas sem tomar gols",
    "Bugado bronze - 3 hash-trick consecutivos"
  ]

  const regrasImportantes = [
    "Jogadores com valor ZERO no mercado valem 900,00",
    "Negociações de empréstimos ou compras seram feitas apenas no final com inicio de uma temporada(torneio)",
    "Jogador com custo ZERO não são negociáveis"
  ]
  return (
    <div className='RegrasContainer'>
      <h1>Regras</h1>
      <h5>Gerais</h5>
      <ol>
        {regras.map(item=>{
          return <li>{item}</li>
        })}
      </ol>
      <h5>Importantes</h5>
      <ol>
        {regrasImportantes.map(item=>{
          return <li>{item}</li>
        })}
      </ol>
      <Link to={"/"}>Voltar ao menu principal</Link>
    </div>
  )
}
