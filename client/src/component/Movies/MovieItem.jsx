import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
  } from "@mui/material";
  import React, { useState ,useEffect} from "react";
  import { Link ,useNavigate, useParams} from "react-router-dom";
  import MovieReviewForm from "./MovieReviewForm";
  import './styles.css';
  import axios from 'axios';
const MovieItem = ({title,posterUrl,releaseDate,id}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const navigate=useNavigate();

  console.log(id)
  console.log(title)
  
  
    // Fetch reviews using Axios
    
  const handleWriteReviewClick = () => {

    navigate(`/movies/${id}/write-review`);
  };
 
  return (
   
    <Card
    sx={{
      margin: 2,
      width: 250,
      height: 500,
      borderRadius: 5,
      ":hover": {
        boxShadow: "10px 10px 20px #ccc",
      },
    }}
  >
    <img height={"60%"} width="100%" src={posterUrl} alt={title} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {new Date(releaseDate).toDateString()}
      </Typography>
    </CardContent>
    
 
   
    <CardActions>
      <Button
       className="book-now-button"
        variant="contained"
        
        LinkComponent={Link}
        to={`/movies/${id}`}
        // sx={{
        //   margin: "auto",
        //   bgcolor: "#2b2d42",
        //   ":hover": {
        //     bgcolor: "#121217",
        //   },
        // }}
        style={{
          backgroundColor: "#2b2d42",
          color: "white",
          marginBottom: "10px", // Adjust the spacing as needed
        }}
        size="small"

       
      >
        Book Now
      </Button>
      <Button
          className="write-review-button" 
          variant="outlined"
        
          component={Link}
          to={`/movies/${id}/write-review`}
          onClick={handleWriteReviewClick}
          style={{
            backgroundColor: "transparent",
            borderColor: "#2b2d42",
            color: "#2b2d42",
          }}
        >
          Write Review
        </Button>
      
      
    </CardActions>
    {showReviewForm && <MovieReviewForm />}
   
  </Card>
  )
}

export default MovieItem