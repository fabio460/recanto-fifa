import { link } from "./link"
import { atualizarUsuarioApi } from "./usuariosApi"

var local = link

export const alterarTemporadaApi = async(pagarFolha, dispatch, loading)=>{
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
         dispatch({
            type:"atualizarTudo",
            payload:{atualizado:!loading}
         })
         return "temporada atualizada com sucesso"
       })
       .catch(err=>{
         console.log("falha ao atualizar temporada!")
         atualizarUsuarioApi((pagarFolha, dispatch, loading))
         setTimeout(() => {
            //window.location.reload()
         }, 1000);
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
       .then(res=>{
         //console.log({inf:"temporada finalizada", res})
          //alert("Termino da 2º temporada, efetue o pagamento da folha!")
          return res
       })
       .catch(res=>{
         return {falha:res}
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