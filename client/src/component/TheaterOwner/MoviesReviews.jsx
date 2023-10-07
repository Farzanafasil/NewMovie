import {React,useEffect,useState} from 'react'
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MoviesReviews = () => {
    const [selectedMovie, setSelectedMovie] = useState([])
    const [movies, setmovies] = useState([])
    const[reviews,setReviews]=useState([])
    const [movieId, setmovieId] = useState('')
    const token= localStorage.getItem("token")
    const navigate=useNavigate();

   useEffect(()=>{
    if(!token){
      console.log('auth display message');
      navigate('/unauth'); // Redirect to the login page
      return;
    }
    axios.get('http://localhost:5000/api//movies').then((response)=>{
        console.log(response.data)
        setmovies(response.data.movies)
       
    }).catch((error)=>{
        console.log(error)
    })
   },[])


    const fetchMovieReviews=()=>{
        console.log(movieId)
        if (selectedMovie) {
            axios.get(`http://localhost:5000/api/moviereview/${movieId}`)
              .then((response) => {
              setReviews(response.data)
                console.log(response.data)
               

              }
              
              )
              .catch((error) => {
                console.error('Error fetching movie reviews:', error);
              });
          }
        

    }
    const HandleMovieId=(e)=>{
        setmovieId(e.target.value)
        console.log('movieId is',movieId)
    }
  return (
    <div><Sidebar/>
    
    <div style={{color:'red'}}>
       

       
       <label>Select a Movie</label>
       <select value={movieId} onChange={HandleMovieId}>
           <option value=''>select a movie</option>
           {movies.map((movie)=>(
               <option key={movie._id} value={movie._id}>{movie.title}</option>
           ))}

       </select>
      
       <button onClick={fetchMovieReviews}>Fetch Reviews</button>
      
     </div>


      
      
      <div style={{color:'red'}}>
        <h3>Reviews for Selected Movie:</h3>
        {reviews.length===0?(<p style={{color:'gray'}}>No Review Available for this Movie</p>):(
            <ul>
            {reviews.map((review) => (
              <li key={review._id}>
                  {/* {review.review} */}
                  <strong>Username:</strong> {review.userName}
                <br />
                <strong>Review:</strong> {review.review}<br/>
                <strong>Rating:</strong> {review.rating}
                  
              </li>
             
            ))}
          </ul>

        )}
        
      </div>

    </div>
  )
}

export default MoviesReviews