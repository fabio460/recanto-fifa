import { link } from "./link"
var local = link

export const pagarPremiacao = async(listaPremiados)=>{
   var fim = 0
   fetch(local+"usuario/pagamentoPremiacoes",{
      method:'put',
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify({
         listaPremiados
      })
   })
   .then(res=>res.json())
   .then(res=>console.log({
      inf:"premiação",
      res,
   }))
   .catch(res=>console.log({"erro ao inserir pagamento":res}))
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

export const pagarPremioBugadoApi = async(premiados)=>{
   if (premiados.length > 0) {   
      fetch(local+"usuario/bugado",{
          method:'put',
          headers:{
             "Content-Type":"application/json"
          },
          body:JSON.stringify({
            premiados
          })
      })
      .then(res=>res.json())
      .then(res=>{
         console.log({inf:"bugado pago", res})
      })
   }
}