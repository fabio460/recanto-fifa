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
