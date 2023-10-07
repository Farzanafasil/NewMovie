import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";


import MovieItem from './MovieItem';

const Movies = ({ searchTerm }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movies, setMovies] = useState([]);
 
  useEffect(() => {
    getAllMovies();
      
 }, []);


    
const getAllMovies=()=>{
  axios.get('http://localhost:5000/api/movies').then((response)=>{
    setMovies(response.data.movies)
   
   
  }).catch((Error)=>{
    console.log(Error)
  })

}
useEffect(() => {
  // Filter movies based on the searchTerm, but only if searchTerm is not null or undefined
  const filtered = movies.filter((movie) =>
    searchTerm
      ? movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );
  setFilteredMovies(filtered);
}, [searchTerm, movies]);
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#900C3F"}
        color="white"
        textAlign={"center"}
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin="auto"
        marginTop={5}
        display={"flex"}
        justifyContent="flex-start"
        flexWrap={"wrap"}
      >
        {movies &&
         filteredMovies.map((movie, index) => (
            <MovieItem
              key={index}
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
          
           
            />
          ))}
      </Box>
    </Box>
  );
};

export default Movies