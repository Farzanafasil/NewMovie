
import {  BrowserRouter, Route, Router, Routes, Redirect } from 'react-router-dom';
import Main from './component/Main';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Header from "./component/Header";
import Home from './component/Home';
import TheaterOwner from './component/TheaterOwner/TheaterOwner';

import Movies from './component/Movies/Movies';


import SignUp from './component/Login/SignUp';
import Login from './component/Login/Login';
import AddMovies from './component/Movies/AddMovies';
import TheaterLogin from './component/Login/TheaterLogin';
import UserProfile from './component/Myprofile/UserProfile';
import TheaterProfile from './component/Myprofile/TheaterProfile';
import { theaterActions,userActions} from './store';
import MovieDetails from './component/Movies/MovieDetails';




function App() {
  const dispatch = useDispatch();
  
const isTheaterLoggedIn=useSelector((state)=>state.theaterAdmin.isLoggedIn)
const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn)  
console.log('theaterloggedin' ,isTheaterLoggedIn);
console.log('userloggedin', isUserLoggedIn)

useEffect(()=>{
if(localStorage.getItem('userId'))
{
dispatch(userActions.login())
}
else if(localStorage.getItem('theaterId'))
{
  dispatch(theaterActions.login())
}


},[])
  return (
    <div >
   
   <Header />

   <section>
   <Routes>
    <Route path='/' element={<Home/>}/>
 
    <Route path='/movies' element={<Movies/>}/>
   
     <Route path='/theaterDashboard' element={<TheaterOwner/>}/>


    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/addmovies' element={<AddMovies method='post' data={{  title: '',  description: '', actors:[],releaseDate: '',posterUrl: '', featured: false,language: '',genre: '',duration: '',}}/>}/>
    <Route path='/theaterlogin' element={<TheaterLogin/>}/>
    <Route path='/myprofile' element={<UserProfile/>}/>
   
    <Route path='/theaterprofile' element={<TheaterProfile/>}/>
    <Route path='/movies/:id' element={<MovieDetails/>}/>
    
    
    
   </Routes>
   </section>
    </div>
  );
}

export default App;
