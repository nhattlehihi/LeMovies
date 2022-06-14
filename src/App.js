import { useState, useContext,useRef} from 'react'
import './App.scss';
// import 'swiper/swiper.min.css';
import { BrowserRouter, Outlet, Route, Routes} from 'react-router-dom'
import Router from './config/Router'
import Header from './components/header/Header';
import Footer from './components/footer/Footer'
import Home from './pages/Home'
import Detail from './pages/Detail';
import Catalog from './pages/Catalog';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}>Home</Route>
        <Route  path='/detail' element={<Detail/>}></Route>
        <Route path=':category' element={<Catalog/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
