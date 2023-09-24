import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Button ,Box} from '@mui/material';
import { styled } from '@mui/system';


const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  padding: theme.spacing(2),
}));


const MovieDetails = ({movies}) => {
   
    const { id } = useParams(); 
    const navigate=useNavigate()

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  const [movie,setMovie]=useState({})
  useEffect(()=>{
    console.log(id)
    console.log('hjkkk')
    axios.get('http://localhost:5000/api/movies/' +id).then((response=>{
     
        setMovie(response.data.movies);
        console.log("Movies:",movie)
        setLoading(false);
    }))



  },[id])
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Check if 'movie' is not null before rendering
  if (!movie) {
    return <div>Movie not found</div>;
  }
 const cancleButton=()=>{
  navigate('/movies') 
 }
return (
  <Box p={5}>

  
  <StyledCard>
    <CardMedia
      component="img"
      alt={movie.title}
      height="400"
      width="200"
      image={movie.posterUrl}
    />
    <CardContent>
      <Typography variant="h4" component="div"sx={{ marginBottom: 1 }}>
        {movie.title}
      </Typography>
      <Typography variant="body2" color="text.secondary"sx={{ marginBottom: 1 }}>
        Release Date: {new Date(movie.releaseDate).toDateString()}
      </Typography>
      <Typography variant="body2" color="text.secondary"sx={{ marginBottom: 1 }}>
          Description: {movie.description}
        </Typography>
        <Typography variant="body2" color="text.secondary"sx={{ marginBottom: 1 }}>
          Actors: {movie.actors.join(', ')}
        </Typography>
      {/* Add more movie details here */}
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Button variant="contained" color="secondary" sx={{ width: '100%', marginBottom: 1 }} onClick={cancleButton}>
              Cancel
            </Button>
            <Button variant="contained" color="primary"sx={{ width: '100%' }} >
              Book Now
            </Button>
          </Box>
    </CardContent>
  </StyledCard>
  </Box>
);
}
export default MovieDetails