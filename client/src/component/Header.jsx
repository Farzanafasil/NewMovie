import React, { useState, useEffect } from 'react';
import {AppBar, Box, Toolbar,Autocomplete,TextField,Tabs,Tab,Button} from '@mui/material'
import axios  from 'axios';
import { useDispatch ,useSelector} from 'react-redux';
import MovieCreationSharpIcon from '@mui/icons-material/MovieCreationSharp';
import { Link, useNavigate } from "react-router-dom";

import { theaterActions, userActions } from '../store';
import Home from './Home';



// Create a context provider component


const Header = ({ onSearch }) => {

  
  const dispatch=useDispatch()
  const [searchTerm, setSearchTerm] = useState("");
  const isTheaterLoggedIn=useSelector((state)=>state.theaterAdmin.isLoggedIn)
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn)  
  

  const [value,setValue]=useState(0)

   const [movies, setMovies] = useState([])


   useEffect(() => {
      
     getAllMovies();

     
  }, []);
   
  const getAllMovies=()=>{

    axios.get('http://localhost:5000/api/movies').then((response)=>{
      setMovies(response.data.movies)


    }).catch((error)=>{
      console.log(error)
    })
  }
 

  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    console.log(movie);
    onSearch(val);
    // if (isUserLoggedIn) {
    //   // navigate(`/booking/${movie._id}`);
    // }


  };
   
  
  return(
  <div>
  <AppBar  position="sticky" sx={{ bgcolor: "#2b2d42", minHeight: '60px' }}>
    <Toolbar>
       <Box width={"20%"}>
        <MovieCreationSharpIcon/>
        </Box>
        <Box width={"20%"} margin={'auto'}>
         <Autocomplete
          onChange={handleChange}
          id=""
        freeSolo
        options={movies && movies.map((option) => option.title)}
        renderInput={(params) => <TextField 
          sx={{input:{color:"white"}}}
          variant='standard'{...params} placeholder="Search Movie" />
        }
       
      />
     
     </Box> 
      
     <Box display={'flex'}>
      <Tabs textColor='inherit' indicatorColor='secondary'value={value} onChange={(e,value)=>setValue(value)}>
        <Tab label='Movies' LinkComponent={Link}  to='/movies'/>
        <Tab label='Home' LinkComponent={Link} to='/'/>

     

          
        
      

        
           {!isTheaterLoggedIn && !isUserLoggedIn && (
              <>
               
                <Tab label='User' LinkComponent={Link} to='/login'/>
               <Tab label='Theater' LinkComponent={Link} to='/theaterlogin'/>
              </>
            )}
            {isUserLoggedIn&&(
              <>
               <Tab label='myaccount' LinkComponent={Link} to='/userdashboard'/>
                {/* <Tab label='Profile' LinkComponent={Link} to='/myprofile'/> */}
                <Tab label='Logout' LinkComponent={Link} to='/' onClick={()=>dispatch(userActions.logout())}/>
      
              </>

            )}
            {isTheaterLoggedIn&&(<>
                 <Tab label='myaccount' LinkComponent={Link} to='/theaterdashboard'/>
                <Tab label='Logout' LinkComponent={Link} to='/' onClick={()=>dispatch(theaterActions.logout()) }/>
      
            
            </>)}
         
      
      
  
        
       
      </Tabs>

     </Box>
  </Toolbar>
 

  </AppBar>

{/* <Home searchTerm={searchTerm} /> */}
</div>
  )
}

export default Header