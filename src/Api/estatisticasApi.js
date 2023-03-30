import { linkApiEstatistica } from "./link"

export const listarEstatisticasApi = async()=>{
    const l = await fetch(linkApiEstatistica+"temporadas")
       .then(r=>r.json())
       .catch(r=>r)
    return l
}

export const setarStatisticaApi = async (campeao, artilheiro, assistecia)=>{
    if (!campeao) {
        campeao = ""
    }
    if (!artilheiro) {
        artilheiro = ""
    }
    if (!assistecia) {
        assistecia = ""
    }
    console.log({campeao, assistecia, artilheiro})
    return await fetch(linkApiEstatistica+"temporadas",{
        method:'post',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            campeao,
            artilheiro,
            assistecia
        })
    })
    .then(res=>res.json())
    .then(res=>console.log(res))
}

export const deletarTodasStatisticasApi = async ()=>{
    fetch(linkApiEstatistica+"temporadas",{
        method:"delete",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>res.json())
}

