import React,{useEffect, useState} from 'react'
import { listarEstatisticasApi } from '../../Api/estatisticasApi'
import "./historico.css"
import { Fab, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { dataFormato } from './servicos'
export default function Historico() {
  const [dados, setDados] = useState()  
  const [carregando, setcarregando] = useState(false)
  useEffect(() => {
    getDados()
  }, [])
    
  async function getDados() {
    setcarregando(true)
    const d = await listarEstatisticasApi()
    setDados(d.reverse())

    setcarregando(false)
  }
  const navigate = useNavigate()
  const scrollTop = ()=>{
    window.scrollTo({
        top:0,
        behavior:'smooth'
    })
  }
  console.log()
  return (
    <div id='h'>

        <Fab onClick={scrollTop} color="primary" aria-label="add" size={'small'} sx={{position:"fixed",bottom:"2%", right:"1%"}}>
            <ArrowUpwardIcon />
        </Fab>
        <div className='historicoHeader'>
          <h1>Histórico</h1>
          <h5 className='historicoBtnVoltar' onClick={()=>navigate("/")}>voltar</h5>
        </div>
        {
           carregando ? 
             <h4 className='historicoCarregando'>carregando ...</h4>:
             dados?.length === 0 ?
               <h4 className='historicoNaoHaDados'>Não há dados estatísticos!</h4>:
                dados?.map((item, key)=>{
                    return(
                        <div className='historicoCard'>
                            <Typography>
                            Rodada  {item.rodada}
                            </Typography>
                            <Typography>
                            Campeão  {item.campeao}
                            </Typography>
                            <Typography>
                            Artilheiro  {item.artilheiro}
                            </Typography>
                            <Typography>
                            Assistente  {item.assistecia}
                            </Typography>
                            <Typography>
                            Data  {dataFormato(item.data)}
                            </Typography>
                        </div>
                    )
                })
        }
    </div>
  )
}
