import CardUsuarios from './CardUsuarios'
import "./Usuarios.css"
export default function Usuarios({Lista}) {
  

  return (
    <div>
      <h2 style={{textAlign:'center', marginTop:20}}>Usuários</h2>
      <div className='UsuariosContainer'>
          {Lista?.map((elem,key)=>{
              return (
                <CardUsuarios usuario={elem}/>
              )
          })}
      </div>
    </div>
  )
}
