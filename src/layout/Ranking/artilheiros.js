import React, { useEffect, useState } from 'react'
import { listarEstatisticasApi } from '../../Api/estatisticasApi'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function Artilheiros() {
const  demoUrl = 'https://codesandbox.io/s/bar-chart-has-no-padding-jphoc';
const [limiteDeItens, setLimiteDeItens] = useState(10)
const [dados, setDados] = useState([])
async function getEstatistica() {
    const e = await listarEstatisticasApi()
    const nomesComRepeticoes = e?.map(item=>{
        return item.artilheiro
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
        if (key < 5 ) {          
          nomesComRepeticoes.filter((item)=>{ 
             if (item === usuario) {
              cont+=1;
             }
          })
          aux.push({name:usuario, artilheiro:cont})
        }
    })
    const ordenada = aux.sort((a,b)=>{
        return a.artilheiro > b.artilheiro ? -1 : a.artilheiro < b.artilheiro ? 1 : 0
    })
    const primeiros = ordenada.filter((elem, key)=>{
        if (key < limiteDeItens) {    
            return elem
        }
    })
    setDados(primeiros.reverse())
}
useEffect(()=>{
    getEstatistica()
},[])  

return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={dados}
          margin={{
            top: 0,
            right: 50,
            left: 0,
            bottom: 0,
          }}
          style={{background:"", diplay:"flex", justifyContent:"center", padding:"0px 250px 0px 0px"}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={'10px'}/>
          <YAxis fontSize={'10px'} />
          <Tooltip />
          <Area type="monotone" dataKey="artilheiro" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}







