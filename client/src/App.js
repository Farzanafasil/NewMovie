
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
import Booking from './component/Booking/Booking';
import Payment from './component/Payment/Payment'

import UserDashboard from './component/User/UserDashboard';

import Mybooking from './component/Booking/Mybooking';
import BookingDetailsPage from './component/Booking/BookingDetailsPage';
import MovieReviewForm from './component/Movies/MovieReviewForm';




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
    <Route path='/booking' element={<Booking/>}/>
    <Route path="/booking/:movieId" element={<Booking />} />
    <Route path='/payment' element={<Payment/>}/>
    
    <Route path='/userdashboard'element={<UserDashboard/>}/>
    <Route path='/mybooking' element={<Mybooking/>}/>
    <Route path="/userdashboard/mybooking" component={Mybooking} />
    <Route path='/bookingdetails/:bookingId'element={<BookingDetailsPage/>}/>

    <Route path="/movies/:movieId/write-review" element={<MovieReviewForm />} />
    
   
    
    
    
   </Routes>
   </section>
    </div>
  );
}

export default App;
