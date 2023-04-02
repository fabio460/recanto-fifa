import { lista } from "./Lista";
import { usuarioType } from "./Types";

const meuElenco = (time:string)=>{
  return  lista.filter(e=>{
        if (e.CLUBE === time) {
            return e
        }
    })
} 


export const listaDeUsuarios = [
    {
        nome:"Fabio",
        saldo:100,
        elenco:meuElenco("ATK Mohun Bagan FC"),
        folha:0
    },
    {
        nome:"Rodrigo",
        saldo:100,
        elenco:meuElenco("Villarreal CF"),
        folha:0
    },
    {
        nome:"Rafael",
        saldo:200,
        elenco:meuElenco("Bayer 04 Leverkusen"),
        folha:0
    },
    {
        nome:"Felipe",
        saldo:200,
        elenco:meuElenco("Real Madrid CF"),
        folha:0
    },
]


export  function buscaUsuarioPeloJogador(jogador:any, Lista:any) {
    let n = ''
    Lista?.map((use:any)=>{
       let sim = use.jogadore.find((e:any)=>{
        if (e.label === jogador) {
          return true
        }
       })
       if (sim) {
        n = use.nome
       }
    })
    return n
  }

export  function CalculaBugado(nome:string, array=[], premio:string, id:string) {
    let contador = 0
    array.filter(e=>{
        if (e === nome) {
            contador++
        }
    })
    return {
        nome,
        contador,
        premio: contador > 2 ? premio : null ,
        id
    }
}

export function removeNome(nome:string) {
    let nomeBruto = nome.split(" ")
    let nomeTratado = ""
    nomeBruto.filter((e:string)=>{
      if (
        e === "ZAG" || e === "VOL" || e === "MC" || e === "ATA" || e === "ME" || e === "MD" ||
        e === "MEI" || e === "GOL" || e === "SA" || e === "LD" || e === "LE" ||
        e === "PE" || e === "PD" || e === "MAE" || e  === "MAD" || e === "ADD" 
        || e === "ADE"
      ) {
        nomeTratado = nomeTratado + " " + e
      }
    })
    return nomeTratado
  }