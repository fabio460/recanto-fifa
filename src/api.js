//const local = "http://localhost:4000/"

const local = "https://recanto-fifa-backend.vercel.app/"
export const listaDeUsuariosApi = async()=>{
   const l = await fetch(local+"usuario")
      .then(r=>r.json())
      .catch(r=>r)
   return l
}


export const getUsuariosPorIdApi = async(id)=>{
   const l = await fetch(local+"usuario/"+id)
      .then(r=>r.json())
      .catch(r=>r)
   return l
}

export const getUsuariosPeloNomeApi = async(id)=>{
   const l = await fetch(local+"usuario/pelonome/"+id)
      .then(r=>r.json())
      .catch(r=>r)
   return l
}

export const criarUsuarioApi = async(nome, saldo, folha, jogadores)=>{
  return await fetch(local+"usuario",{
      method:'post',
      //body:form
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify({
         nome, folha, saldo, jogadores
      })
   })
   .then(res=>res.json())
   .then(res=>{
      window.location.reload()
   })
}

export const atualizarUsuarioApi = async(id, nome, saldo, folha)=>{
   return await fetch(local+"usuario",{
       method:'put',
       headers:{
          "Content-Type":"application/json"
       },
       body:JSON.stringify({
          id, nome, folha, saldo
       })
    })
    .then(res=>res.json())
    .then(res=>{
       window.location.reload()
    })
 }

 export const alterarSaldoApi = async(id, saldo)=>{
   return await fetch(local+"usuario",{
       method:'put',
       headers:{
          "Content-Type":"application/json"
       },
       body:JSON.stringify({
          id, saldo
       })
    })
    .then(res=>res.json())
    .then(res=>{
       window.location.reload()
    })
 }

 export const alterarFolhaApi = async(id, folha)=>{
   return await fetch(local+"usuario",{
       method:'put',
       headers:{
          "Content-Type":"application/json"
       },
       body:JSON.stringify({
          id, folha
       })
    })
    .then(res=>res.json())
    .then(res=>{
       window.location.reload()
    })
 }

 export const adicionarSaldoApi = async(id, valor=0)=>{

   if (id) {      
      const usuario =await getUsuariosPeloNomeApi(id)
      return await fetch(local+"usuario",{
          method:'put',
          headers:{
             "Content-Type":"application/json"
          },
          body:JSON.stringify({
             id:usuario[0].id, saldo:(usuario[0].saldo + valor)
          })
       })
       .then(res=>res.json())
       .then(res=>{
         console.log(usuario[0])
          window.location.reload()
       })
   }
 }

export const deletarUsuarioApi = async(id)=>{
   return await fetch(local+"usuario",{
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
      window.location.reload()
   })
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
   dispatch 
)=>{
   return await fetch(local+"jogador",{
      method:'post',
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify({
         label,
         Posicao,
         OVER,
         CLUBE,
         idUsuario
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
   })
}