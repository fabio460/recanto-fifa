
import { link } from "./link"
import { getUsuariosPorIdApi } from "./usuariosApi"
var local = link
export const getJogadorPeloNomeApi = async(nome)=>{
    const l = await fetch(local+"jogador/nome/"+nome)
       .then(r=>r.json())
       .catch(r=>r)
    return l
}

export const deletarJogadorApi = async(id,atualizar,setatualizar)=>{
    return await fetch(local+"jogador",{
       method:'delete',
       headers:{
          "Content-Type":"application/json"
       },
       body:JSON.stringify({
          id
       })
    })
    .then(res=>res.json())
    .then(res=>{
       setatualizar(!atualizar)
    })
}
export const adicionarJogadorApi = async(
    label,
    Posicao,
    OVER,
    CLUBE,
    idUsuario,
    valor,
    dispatch 
 )=>{
       const usuario =await getUsuariosPorIdApi(idUsuario)
          await fetch(local+"usuario",{
             method:'put',
             headers:{
                "Content-Type":"application/json"
             },
             body:JSON.stringify({
                id:usuario.id,
                saldo:(usuario.saldo - valor),
                folha:(usuario.folha + valor*0.03)
             })
          })
          .then(res=>res.json())
          .then(res=>{
             console.log(res)
          })
 
       await fetch(local+"jogador",{
          method:'post',
          headers:{
             "Content-Type":"application/json"
          },
          body:JSON.stringify({
             label,
             Posicao,
             OVER,
             CLUBE,
             idUsuario,
             valor
          })
       })
       .then(res=>res.json())
       .then(res=>{
          dispatch({
             type:"loading",
             payload:{loading:true}
          })
          alert("O jogador "+label+" foi adicionado ao seu time")
          dispatch({
             type:"loading",
             payload:{loading:false}
          })
          window.location.reload()
       })
 }
 
export const transferenciaDeJogadorApi = async(id,idUsuario, valor=0,dispatch, loading)=>{
    if (id && idUsuario) {      
       dispatch({
          type:"loading",
          payload:{loading:true}
       }) 
      await fetch(local+"jogador/transferenciaMonetaria",{
          method:'put',
          headers:{
             "Content-Type":"application/json"
          },
          body:JSON.stringify({
             id, idUsuario, valor
          })
       })
       .then(res=>res.json())
       .then(res=>{
         console.log(res)
       })
 
       await fetch(local+"jogador/transferenciaFisica",{
          method:'put',
          headers:{
             "Content-Type":"application/json"
          },
          body:JSON.stringify({
             id, idUsuario, valor
          })
       })
       .then(res=>res.json())
       .then(res=>{
         console.log(res)
         window.location.reload()
       })
   }
 }