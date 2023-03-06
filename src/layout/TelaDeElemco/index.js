import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletarJogadorApi, getUsuariosPorIdApi } from '../../api'
import { usuarioType } from '../../Types'
import ModalAtualizarUsuario from './modalAtualizarUsuario'
import ModalDispensarJogador from './modalDispensarJogador'
import ModalTransferirJogador from './modalTransferirJogador'
import "./TelaElenco.css"
export default function TelaDeElenco() {
  const [usuario, setusuario] = useState({})
  const [atualizar, setatualizar] = useState(false)
  let usuarioLocalStorage = localStorage.getItem("usuarioSelecionado") || ""  
  var id = JSON.parse(usuarioLocalStorage).id 
  const h = useNavigate()

  async function getUsuarioPorId(params) {
    const p = await getUsuariosPorIdApi(id)
    setusuario(p)
  }

  useEffect(()=>{
    getUsuarioPorId()
  },[atualizar])

  const loading = useSelector(state=>state.loadingReducer.loading)
  const despensar = (Id)=>{
    deletarJogadorApi(Id,atualizar,setatualizar)
  }
  return (
    <div className='TelaDeElencoContainer'>
        <div className='TelaDeElencoHeader'>
            <h5>Usuario: {usuario?.nome}</h5>
             <div style={{display:"flex", alignItems:"center"}}>
                <button 
                  onClick={()=>h("/")}
                  className='btn btn-primary m-2'
                >Voltar</button>
                <ModalAtualizarUsuario id={id} usuario={usuario}/>
             </div>
        </div>
        <div>
            <h5>Time: {usuario.time}</h5>
            <h5>Saldo: {usuario.saldo?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h5>
            <h5>Folha: {usuario.folha?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h5>
            
        </div>
        <div className='tabelaDeElencos'>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Posição</th>
                        <th scope="col">Overall</th>
                        <th scope="col">Clube</th>
                        <th scope="col"> </th>
                    </tr>
                </thead>
                <tbody>
                   {usuario.jogadore?.map((elem,key)=>{
                    return(
                        <tr>
                            <td >{elem.label}</td>
                            <td>{elem.Posicao}</td>
                            <td>{elem.OVER}</td>
                            <td>{elem.CLUBE}</td>
                            <td style={{display:"flex",justifyContent:"flex-end"}}>
                              {/* <button onClick={()=> despensar(elem.id)} className='btn btn-danger me-3'>Despensar</button> */}
                              <ModalDispensarJogador/>  
                              <ModalTransferirJogador id={elem.id}/>
                            </td>
                        </tr>
                    )
                   })}
                </tbody>
            </table>
        </div>
    </div>
  )
}
