export interface usuarioType{
    nome:string,
    saldo:number,
    jogadore:[
        {
            time:string,
            jogador:string,
            over:number,
            salario:number,
            posicao:string,
            valor:number
        }[]
    ] | [],
    folha:number,
    time:string
}