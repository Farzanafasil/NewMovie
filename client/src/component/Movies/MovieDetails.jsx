import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams ,useNavigate,Link} from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Button ,Box} from '@mui/material';
import { styled } from '@mui/system';
import { userActions,theaterActions } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import MovieReviewForm from "./MovieReviewForm";
import Review from './Review'; 
import Rating from '@mui/material/Rating'; 
import './Review.css'

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  padding: theme.spacing(2),
}));


const MovieDetails = ({movies}) => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const isTheaterLoggedIn=useSelector((state)=>state.theaterAdmin.isLoggedIn)
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn)  
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [intendedDestination, setIntendedDestination] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const[reviews,setReviews]=useState([])
  const userId = localStorage.getItem("userId");
  const userToken=localStorage.getItem("token")

  const [movie,setMovie]=useState({})
  useEffect(()=>{
    console.log(id)
    console.log('hjkkk')
    axios.get('http://localhost:5000/api/movies/' +id).then((response=>{
     
        setMovie(response.data.movies);
        console.log("Movies:",movie)
        setLoading(false);
    }))
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
  
  // Assuming you have an endpoint to fetch reviews for the movie
  axios.get(`http://localhost:5000/api/moviereview/${id}`)
    .then((response) => {
      console.log(response.data)
      setReviews(response.data);
      console.log('reviews are',reviews)
    })
    .catch((error) => {
      console.error('Error fetching reviews:', error);
    });


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

const handleBookNowClick=()=>{
  if (isUserLoggedIn) {
  //  navigate('/booking') ;
  // navigate(`/booking/${movie._id}`)

  navigate(`/booking/${movie._id}?title=${encodeURIComponent(movie.title)}`);
  } else if (isTheaterLoggedIn) {
   
  } else {
    
    alert("Please log in to book tickets.");
    setIntendedDestination('/booking'); // Set the intended destination as the booking page
    navigate(`/login?intended=${'/booking'}`); // Pass intended destination as a query parameter
   
  //  navigate('/login');
  }
}

const handleWriteReviewClick = () => {

  navigate(`/movies/${id}/write-review`);
};



function calculateAverageRating(reviews) {
  if (reviews.length === 0) {
    return 0; // Default to 0 if there are no reviews
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1); // Calculate and round the average rating
}



const handleDeleteReview = (reviewId) => {
  console.log('butn')
  console.log('Review ID to be deleted:', reviewId);


  axios.delete(`http://localhost:5000/api/reviews/${reviewId}`).then((response)=>{
    if(response.status===200)
    {
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
    }

  })
  .catch((error)=>{
    console.error('Error deleting review:',error)

  })
};
return (
  <Box p={5}>

  
  <StyledCard  sx={{ marginBottom: '20px' }}>
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
      <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
            <Button variant="contained" color="secondary" sx={{ width: '100%', marginBottom: 1 }} onClick={cancleButton}>
              Cancel
            </Button>
            <Button variant="contained" color="primary"sx={{ width: '100%' }} onClick={handleBookNowClick} >
              Book Now
            </Button>
            <Button  className="write-review-button" variant="outlined" color='primary' sx={{width:'100%'}}
        
          component={Link}
          to={`/movies/${id}/write-review`}
          onClick={handleWriteReviewClick}
          
        >
          Write Review
        </Button>
        {showReviewForm && <MovieReviewForm />}
          </Box>
    </CardContent>
  </StyledCard>

       

<div className="review-box"  style={{ textAlign: 'center', marginTop: '2px' }}>
  <h2>Reviews</h2>
  <p>Average Rating: {calculateAverageRating(reviews)}</p>
  {reviews && reviews.length === 0 ? (
    <Typography variant="body2" color="text.secondary">
      No reviews available for this movie.
    </Typography>
  ) : (
   
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      
      {reviews.map((review) => (
         <div key={review._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
         <Review key={review._id} review={review} onDelete={handleDeleteReview} userId={userId}style={{ margin: '10px' }} />
         
       </div>
      ))}
    </div>
  )}
</div>


      
  </Box>
);
}
export default MovieDetails