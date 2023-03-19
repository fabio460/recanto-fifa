import { link } from "./link"

var local = link

export const alterarTemporadaApi = async(pagarFolha)=>{
    const temporadaAtual = await getTemporadaApi()
    if (temporadaAtual.numero === 1) {      
       return await fetch(local+"temporada",{
          method:'put',
          headers:{
             "Content-Type":"application/json"
          },
          body:JSON.stringify({
             id: temporadaAtual.id, numero:2
          })
       })
       .then(r=>r.json())
       .then(r=>{
          alert("Termino da 1º finalizada!")
          window.location.reload()

       })
    }else{
       await fetch(local+"temporada",{
          method:'put',
          headers:{
             "Content-Type":"application/json"
          },
          body:JSON.stringify({
             id: temporadaAtual.id, numero:1
          })
       })
       .then(r=>r.json())
       .then(r=>{
          alert("Termino da 2º temporada, efetue o pagamento da folha!")
       })
    }
 }

 export const getTemporadaApi = async()=>{
    return await fetch(local+"temporada",{
       method:'get',
       headers:{
          "Content-Type":"application/json"
       },
    })
       .then(r=>r.json())
 }