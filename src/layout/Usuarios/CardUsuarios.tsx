
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { usuarioType } from '../../Types'
import { formatoMonetario } from '../../Uteis'

interface userType{
   usuario:usuarioType
}
export default function CardUsuarios({usuario}:userType) {
  const h = useNavigate()
  const selecionarElenco = ()=>{
    localStorage.setItem("usuarioSelecionado",JSON.stringify(usuario))
    h("/elencos")
  }
  const comprarJogador = ()=>{
    localStorage.setItem("usuarioSelecionado",JSON.stringify(usuario))
    h("/TelaListaDeJogadores")
  }


  function contadorFolha(arr:any, nome:string) {
    let soma = 0
    arr.map((elem:any)=>{
       soma += elem.valor
    })
    let total = soma*0.03
    return total
  }
  const medalhaDeOuro = 'https://mh-2-agencia-estoque.panthermedia.net/media/media_detail/0026000000/26306000/26306473_detail.jpg'
  const medalhaDePrata = "data:image/jpeg;base64,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"
  const medalhaDeBronse = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFKwzR_ll008hEr8iikWJZAa1ObGxHst-k9Q&usqp=CAU"
  return (
    <div className='CardUsuarios'>
      <div className={usuario.bugado && 'bugadosContainer'}> 
        {usuario.bugado &&
          <div style={{display:"flex"}}>
           {
            (
              usuario.bugado === "ouro" ||
              usuario.bugado === "ouroprata" ||
              usuario.bugado === "ourobronze" ||
              usuario.bugado === "ouropratabronze" 
            ) && 
              <div className='bugadoItens'>
                <img 
                  className='imgBugado'
                  src={medalhaDeOuro}
                />
              </div>
            }
            {
              (
                usuario.bugado === "prata" ||
                usuario.bugado === "pratabronze" ||
                usuario.bugado === "ouroprata" ||
                usuario.bugado === "ouropratabronze"
              ) && 
              <div className='bugadoItens'>
                <img 
                  className='imgBugado'
                  src={medalhaDePrata}
                />
              </div>}
            {
              (
                usuario.bugado === "bronze" ||
                usuario.bugado === "ourobronze" ||
                usuario.bugado === "pratabronze" ||
                usuario.bugado === "ouropratabronze"
              ) && 
              <div className='bugadoItens'>
                <img 
                  className='imgBugado'
                  src={medalhaDeBronse}
                />
              </div>}
          </div>
        }
      </div>
      <div className='UsuarioNome'>{usuario.nome}</div>
      <div className='UsuarioSaldoLabel'>Saldo</div>
      { 
        usuario.saldo < 0 ?
        <div className='UsuarioSaldo' style={{color:"red"}}> {formatoMonetario(usuario.saldo)}</div>:
        <div className='UsuarioSaldo'> {formatoMonetario(usuario.saldo)}</div>
      }
      <div className='UsuarioSaldoLabel'>Folha</div>
           <div>{formatoMonetario(contadorFolha(usuario.jogadore,usuario.nome))}</div>
      <button  
        className="btn btn-success w-100 m-1"
        onClick={comprarJogador}
      >Comprar jogador</button>
      <button onClick={selecionarElenco} className="btn btn-success w-100 m-1">Meu elenco</button>
    </div>
  )
}
