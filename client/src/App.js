
import {  BrowserRouter, Route, Router, Routes } from 'react-router-dom';


import Header from "./component/Header";
import Home from './component/Home';
import TheaterOwner from './component/TheaterOwner/TheaterOwner';

import Movies from './component/Movies/Movies';

import SignUp from './component/Login/SignUp';
import Login from './component/Login/Login';






function App() {
  return (
    <div >
   <Header/>

   <section>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/movies' element={<Movies/>}/>
    <Route path='/theater' element={<TheaterOwner/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>
    
    
   </Routes>
   </section>
    </div>
  );
}

export default App;
