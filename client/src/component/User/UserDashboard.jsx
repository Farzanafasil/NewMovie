
import React, { useEffect, useState } from "react";
import { Route, Switch, Link, Redirect, Routes } from 'react-router-dom';

import { Box, Button, Typography } from "@mui/material";
import './UserDashboard.css'; 
import axios from "axios";
import MovieItem from "../Movies/MovieItem";

const UserDashboard = () => {



    const [movies, setMovies] = useState([]);

  useEffect(() => {
  
    axios.get('http://localhost:5000/api/movies').then((response)=>{

   
    setMovies( response.data.movies )

    // console.log(response.data);
  
   
  }).catch((Error)=>{
    console.log(Error)
  })

   
   
  }, []);
  return (
   
    <div className="user-dashboard">
    <div className="sidebar">
      <h2>My account</h2>
      <ul>
         <li>
            <Link to="/myprofile">Profile</Link>
          </li>
          <li>
          <Link to="/mybooking">My Bookings</Link>
        </li>
        <li>Settings</li>
      </ul>
    </div>
    <div className="content">
      <h1>Welcome to Your Dashboard</h1>
      {/* <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor est nec mauris
        ultricies, eu dapibus elit tincidunt.
      </p> */} */}

   
       <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
      >
        {
          movies&&movies.map((movie, index) => (
              <MovieItem
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>

  


    </div>
  </div>
  )
}

export default UserDashboard