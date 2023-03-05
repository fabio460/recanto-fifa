import CardUsuarios from './CardUsuarios'
import "./Usuarios.css"
export default function Usuarios({Lista}) {
  

  return (
    <div className='UsuariosContainer'>
        {Lista?.map((elem,key)=>{
            return (
               <CardUsuarios usuario={elem}/>
            )
        })}
    </div>
  )
}
