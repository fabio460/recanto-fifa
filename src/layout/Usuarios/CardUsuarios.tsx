
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { usuarioType } from '../../Types'

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

  const dispatch = useDispatch()
  const folha = useSelector((state:any)=>state.pagamentoDeFolhaReducer.folha)
  function contadorFolha(arr:any, nome:string) {
    let soma = 0
    arr.map((elem:any)=>{
       soma += elem.valor
    })
    let total = soma*0.03
    return total
  }
  return (
    <div className='CardUsuarios'>
      <div className='UsuarioNome'>{usuario.nome}</div>
      <div className='UsuarioSaldoLabel'>Saldo</div>
      <div className='UsuarioSaldo'> {usuario.saldo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
      <div className='UsuarioSaldoLabel'>Folha</div>
           <div>{contadorFolha(usuario.jogadore,usuario.nome).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
      <button  
        className="btn btn-success w-100 m-1"
        onClick={comprarJogador}
      >Comprar jogador</button>
      <button onClick={selecionarElenco} className="btn btn-success w-100 m-1">Meu elenco</button>
    </div>
  )
}
