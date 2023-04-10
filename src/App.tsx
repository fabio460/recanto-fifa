import React from 'react';

import './App.css';
import {lista} from "./Lista"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './layout';
import TelaDeUsuarios from './layout/TelaDeUsuarios';
import TelaDeElenco from './layout/TelaDeElemco';
import TelaListaDeJogadores from './layout/CompraDeJogadores';
import Regras from './layout/Regras';
import Historico from './layout/Historico';

function App() {
  const time = lista.filter(e=>{
    if (e.CLUBE === "Bayer 04 Leverkusen") {
      return e
    }
  })
  
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Layout/>}></Route>
            <Route path='/usuarios' element={<TelaDeUsuarios/>}></Route>
            <Route path='/elencos' element={<TelaDeElenco/>}></Route>
            <Route path='/TelaListaDeJogadores' element={<TelaListaDeJogadores/>}></Route>
            <Route path='/regras' element={<Regras/>}></Route>
            <Route path='/historico' element={<Historico/>}></Route>
         </Routes>
      </BrowserRouter>   
    </div>
  );
}

export default App;
