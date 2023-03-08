//const local = "http://localhost:4000/"



const local = "https://recanto-fifa-backend.vercel.app/"

export const listaDeUsuariosApi = async()=>{
   return await fetch(local+"usuario")
      .then(r=>r.json())
}


export const getUsuariosPorIdApi = async(id)=>{
   const l = await fetch(local+"usuario/"+id)
      .then(r=>r.json())
      .catch(r=>r)
   return l
}

export const getUsuariosPeloNomeApi = async(nome)=>{
   const l = await fetch(local+"usuario/pelonome/"+nome)
      .then(r=>r.json())
      .catch(r=>r)
   return l
}

export const getJogadorPeloNomeApi = async(nome)=>{
   const l = await fetch(local+"jogador/nome/"+nome)
      .then(r=>r.json())
      .catch(r=>r)
   return l
}

export const criarUsuarioApi = async(nome, saldo, folha, jogadores, time)=>{
  return await fetch(local+"usuario",{
      method:'post',
      //body:form
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify({
         nome, folha, saldo, jogadores, time
      })
   })
   .then(res=>res.json())
   .then(res=>{
      window.location.reload()
   })
}

export const atualizarUsuarioApi = async(id, nome, saldo, folha, time)=>{

   await fetch(local+"usuario",{
       method:'put',
       headers:{
          "Content-Type":"application/json"
       },
       body:JSON.stringify({
          id, nome, folha, saldo, time
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

 export const adicionarSaldoApi = async(id, valor=0,dispatch)=>{
    if (id) {      
      dispatch({
         type:"loading",
         payload:{loading:true}
      }) 
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
         dispatch({
            type:"loading",
            payload:{loading:false}
         }) 
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
   valor,
   dispatch 
)=>{
      const usuario =await getUsuariosPorIdApi(idUsuario)
      console.log(usuario)
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

//temporadas

export const selecionarTemporadaApi = async()=>{
   return await fetch(local+"temporada")
      .then(r=>r.json())
}

export const alterarTemporadaApi = async()=>{
   return await fetch(local+"temporada",{
      method:'put',
      headers:{
         "Content-Type":"application/json"
      },
   })
      .then(r=>r.json())
}