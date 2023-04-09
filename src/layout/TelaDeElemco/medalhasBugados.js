import React from 'react'

export default function MedalhasBugados({usuario}) {
  return (
    <div>
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
  )
}
