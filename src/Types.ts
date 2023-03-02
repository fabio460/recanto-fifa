export interface usuarioType{
    nome:string,
    saldo:number,
    elenco:[
        {
            time:string,
            jogador:string,
            over:number,
            salario:number,
            posicao:string
        }[]
    ] | [],
    folha:number
}