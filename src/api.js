const local = "http://localhost:4001/"

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
   .then(res=>console.log(res))
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
   idUsuario 
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
      alert("O jogador "+label+" foi adicionado ao seu time")
   })
}