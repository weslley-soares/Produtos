import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';
import Index from './Components/Index/index';
import Cadastro from './Components/Cadastro/Cadastro';
import Login from './Components/Login/Login';
import Perfil from './Components/Perfil/Perfil';
import Cad_Produto from './Components/Cad_Produtos/Cadastro_Produto';
import Produto from './Components/Produtos/Produtos';

export default function App() {

  return (
    <>
      <Header/>
      <Perfil/>
      <Nav/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/cadastro' element={<Cadastro/>}/>
          <Route path='/produto' element={<Produto/>}/>
          <Route path='/cad' element={<Cad_Produto/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}