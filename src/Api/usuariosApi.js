import { link } from "./link"

var local = link

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



