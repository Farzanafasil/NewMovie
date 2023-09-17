import React, { useState, useEffect } from 'react'
import {AppBar, Box, Toolbar,Autocomplete,TextField,Tabs,Tab} from '@mui/material'

import MovieCreationSharpIcon from '@mui/icons-material/MovieCreationSharp';
import { Link, useNavigate } from "react-router-dom";
import { getAllMovies } from "../Api/Api";

const Header = () => {
  const [value,setValue]=useState(0)

   const [movies, setMovies] = useState([])


   useEffect(() => {
    getAllMovies()
      .then((data)=>{

      
        setMovies(data.movies)
        
      }) 
        
     
      .catch((err) => console.log(err));
  }, []);
   
  
  
  // const movie=['app','hjii','hjjk']
  return<AppBar  position="sticky" sx={{bgcolor:"#2b2d42"}}>
    <Toolbar>
      <Box width={"20%"}>
        <MovieCreationSharpIcon/>
        </Box>
       <Box width={"30%"} margin={'auto'}>
         <Autocomplete
        id=""
        freeSolo
        options={movies && movies.map((option) => option.title)}
        renderInput={(params) => <TextField 
          sx={{input:{color:"white"}}}
          variant='standard'{...params} placeholder="Search Movie" />}
      />
     </Box>
     <Box display={'flex'}>
      <Tabs textColor='inherit' indicatorColor='secondary'value={value} onChange={(e,value)=>setValue(value)}>
        <Tab label='Movies' LinkComponent={Link}  to='/movies'/>
        <Tab label='Home' LinkComponent={Link} to='/'/>
        <Tab label='User' LinkComponent={Link} to='/login'/>
      
       
       
      </Tabs>

     </Box>
         </Toolbar>
    
  </AppBar>
  
}

export default Header