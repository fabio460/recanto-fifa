//const local = "http://localhost:4000/"

const local = "https://recanto-fifa-backend2-0.vercel.app/"
//const local = "https://recanto-fifa-backend2-0.vercel.app"

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

 export const alterarSaldoApi = async(arrayPagamento, dispatch, pagarFolha)=>{
   var fim = 0
      dispatch({
         type:"loading",
         payload:{loading:true}
      }) 
   arrayPagamento.map(async(usuario, key)=>{   
      fetch(local+"usuario",{
         method:'put',
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify({
            id: usuario.id,
            saldo: usuario.total
         })
      })
      .then(res=>res.json())
      .then(res=>{
         fim++
         if (fim === arrayPagamento.length && fim !== 0) {    
            window.location.reload()
         }
      })
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

 export const pagarFolhaApi = async(usuariosParaPagar)=>{
   let fim = 0
   usuariosParaPagar.map(usuario=>{
      fetch(local+"usuario",{
          method:'put',
          headers:{
             "Content-Type":"application/json"
          },
          body:JSON.stringify({
             id: usuario.id, 
             saldo: usuario.novoSaldo
          })
       })
       .then(res=>res.json())
       .then(res=>{
         fim++
         console.log(fim)
         console.log(usuariosParaPagar.length)
         if (usuariosParaPagar.length === fim) {      
            alert("Pagamento da folha realizado!")
            window.location.reload()
         }
       })
   })
 }
 let arrayNomes = []
 export const adicionarSaldoApi = async(id, valor=0)=>{
    if (id) {      
      return await fetch(local+"usuario",{
          method:'put',
          headers:{
             "Content-Type":"application/json"
          },
          body:JSON.stringify({
             id, saldo:valor
          })
       })
       .then(res=>res.json())
       .then(res=>{
         alert("Despensa realizada com sucesso!")
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

//temporadas

export const getTemporadaApi = async()=>{
   return await fetch(local+"temporada",{
      method:'get',
      headers:{
         "Content-Type":"application/json"
      },
   })
      .then(r=>r.json())
}

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

export const bugadoPrataBronzeApi = async(id, bugado)=>{
      if (id) {         
         return await fetch(local+"usuario/bugado",{
            method:'put',
            headers:{
               "Content-Type":"application/json"
            },
            body:JSON.stringify({
               id, bugado
            })
         })
         .then(res=>res.json())
         .then(res=>{
            console.log(res)
            window.location.reload()
         })
         .then(res=>console.log(res))
      }
}

export const alterarBugadoApi = async(id, bugado, contador)=>{
   if (contador < 3) {
      return await fetch(local+"usuario/bugado",{
         method:'put',
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify({
            id, bugado:null
         })
      })
      .then(res=>res.json())
      .then(res=>{
         
         //window.location.reload()
      })
      .then(res=>console.log(res))
   }

   if (bugado === "ouro" || bugado === "prata" || bugado === "bronze" ) {      
      return await fetch(local+"usuario/bugado",{
          method:'put',
          headers:{
             "Content-Type":"application/json"
          },
          body:JSON.stringify({
             id, bugado
          })
       })
       .then(res=>res.json())
       .then(res=>{
          console.log(res)
          //window.location.reload()
       })
       .then(res=>console.log(res))
   }
 }

