import React, { useEffect, useState } from 'react'
import { listarEstatisticasApi } from '../../Api/estatisticasApi'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

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
          aux.push({name:usuario, campeao:cont})
    })
    const ordenada = aux.sort((a,b)=>{
      return a.campeao > b.campeao ? -1 : a.campeao < b.campeao ? 1 : 0
    })
    const primeiros = ordenada.filter((elem, key)=>{
      if (key < 5) {    
        return elem
      }
    })
    setDados(primeiros)
}
useEffect(()=>{
    getEstatistica()
},[])  

return (
    <div style={{ width: '100%', height: "100%" }}>
      <ResponsiveContainer>
        <AreaChart
          data={dados}
          margin={{
            top: 0,
            right: 50,
            left: 0,
            bottom: 0,
          }}
          padding={{left:0}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={'10px'}/>
          <YAxis fontSize={'10px'} />
          <Tooltip />
          <Area type="monotone" dataKey="campeao" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}






