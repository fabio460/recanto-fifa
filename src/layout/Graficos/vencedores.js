import React, { useEffect, useState } from 'react'
import { listarEstatisticasApi } from '../../Api/estatisticasApi'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { dimencao } from './dimencoes';

export default function Vencedores() {
const  demoUrl = 'https://codesandbox.io/s/bar-chart-has-no-padding-jphoc';
const [estatistica, setEstatistica] = useState()
const [dados, setDados] = useState([])
async function getEstatistica() {
    const e = await listarEstatisticasApi()
    const nomesComRepeticoes = e?.map(item=>{
        return item.campeao
    }) 
    
    const u = [... new Set(nomesComRepeticoes)]
    const usuarios = u.filter(e=>{
        if (e !== "") {
            return e
        }
    })
    let aux = []
    usuarios.filter((usuario, key)=>{
        let cont = 0      
          nomesComRepeticoes.filter((item)=>{ 
             if (item === usuario) {
              cont+=1;
             }
          })
          aux.push({name:usuario, Campeonatos:cont})
    })
    const ordenada = aux.sort((a,b)=>{
      return a.Campeonatos > b.Campeonatos ? -1 : a.Campeonatos < b.Campeonatos ? 1 : 0
    })

    setDados(ordenada.reverse())
}
useEffect(()=>{
    getEstatistica()
},[])  

return (
    <div className="grafico">
      <ResponsiveContainer >
        <AreaChart
          data={dados}
          margin={dimencao}
          padding={{left:0}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={'12px'}/>
          <YAxis fontSize={'12px'} />
          <Tooltip />
          <Area type="monotone" dataKey="Campeonatos" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}






