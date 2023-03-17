export function removerArraysRepetidos(array) {
    return [... new Set(array)]
}

export var dadosDePagamento = (nomesSelecionados, arrayPagamento, UsuariosDaLista)=>{
    let dados = []
    nomesSelecionados.map(e=>{
      let soma = 0
      arrayPagamento.map(u=>{
        if (e === u.nome) {
          soma+= u.valor
        }
      })
      let usuario = {nome:e,soma}
     
      UsuariosDaLista.map(u=>{
        if (u.nome === usuario.nome) {
          return dados.push({
            id: u.id,
            total: u.saldo + soma,
            UsuariosDaLista
          })
        }
      }) 
    })
    return dados
  } 

  export function setPremiacao(array, Lista) {

    let nomes = [... new Set(array.map(item=> item.nome))]
    let obj = nomes.map(n=>{
        let filtro = array.filter((v)=>{
            let soma = 0
            if (v.nome === n) {
                return  soma += v.valor
            }
        },0)
        let total = filtro.reduce((soma, elem)=>{
            return soma + elem.valor
        },0) 
        let usuario = Lista.filter(elem=>{
            if (elem.nome === n) {
                return elem
            }
        })
        return  {nome:n, total: total + usuario[0]?.saldo ,id: usuario[0]?.id}
    })
    return obj
  }

export function getPremiacoesBugados(checadoA, checadoB, campeao, artilheiro, viceArt, Lista) {
    let ouro = ""
    if (campeao === artilheiro && campeao === viceArt && artilheiro === viceArt) {
      ouro = "ouro"
    }
    var idOuro = ""
    Lista?.map(e=>{
      if (e.nome === campeao) {
        idOuro = e.id
      }
    })
    let checado = checadoA.concat(checadoB)
    let chegadoTrue = checado.filter(c=>{
      if (c.checked) {
        return c
      }
    })
    checado = chegadoTrue
    let nomesDosPremiados = []
    if (ouro !== "") {
      nomesDosPremiados.push(campeao)
    }
    checado.forEach(item=>{
       nomesDosPremiados.push(item.nome)
    })
    nomesDosPremiados = [...new Set(nomesDosPremiados)]
    let premiados = []

    nomesDosPremiados.map(p=>{
      let premio = checado.map(c=>{
        let texto =  ""
        if (p === c.nome) {
          let resultado =  (campeao === p ? ouro : "" ) + texto + c.bugado
          ouro = ""
          return resultado
        }
        texto = ""
      })
      if (ouro !== "") {
        premio.push(ouro)
      }
      let id = ""
      checado.find(e=>{
        if (e.nome === p) {
          id = e.dados.selecionado.id
        }
        if (e.nome === ouro) {
          id = e.dados.selecionado.id
        }
      })
      premiados.push({nome:p , premio:premio.join(""), id: id === '' ? idOuro: id })
    })
    return premiados
  }