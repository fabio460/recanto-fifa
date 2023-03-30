import React, { useEffect, useState } from 'react'
import { listarEstatisticasApi } from '../../Api/estatisticasApi'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function Assistentes() {
const  demoUrl = 'https://codesandbox.io/s/bar-chart-has-no-padding-jphoc';
const [estatistica, setEstatistica] = useState()
const [dados, setDados] = useState([])
async function getEstatistica() {
    const e = await listarEstatisticasApi()
    const nomesComRepeticoes = e.map(item=>{
        return item.assistecia
    }) 
    const usuarios = [... new Set(nomesComRepeticoes)]
    let aux = []
    usuarios.map(usuario=>{
        let cont = 0
        nomesComRepeticoes.filter(item=>{ 
           if (item === usuario) {
            cont+=1;
           }
        })
        aux.push({name:usuario, campeao:cont})
    })
    setDados(aux)
    setEstatistica(e)
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
            right: 0,
            left: -10,
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







