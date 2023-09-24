
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import MovieItem from "./Movies/MovieItem";
import axios from "axios";

const Home = () => {


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
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box margin={"auto"} width="80%" height={"40vh"} padding={2}>
        <img
          src="https://e1.pxfuel.com/desktop-wallpaper/60/646/desktop-wallpaper-kali-malayalam-movie-poster-malayalam-movies.jpg"
          alt="Brahmastra"
          width={"100%"}
          height={"100%"}
        />
      </Box>
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
    </Box>
  )
}

export default Home