import React, { useState , useEffect } from 'react'
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useNavigate } from 'react-router-dom';
import './AddMovies.css'
import {
  Dialog,
  Box,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";

const AddMovies = (props) => {
  console.log(props)
   const navigate=useNavigate();
    const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Sci-Fi'];
    const language=['Malayalam','Hindi','English','Tamil']
    const [isFormOpen, setIsFormOpen] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);
    const token= localStorage.getItem("token")

    // const[newMovies,setNewMovies]=useState({
    //     title: '',
    //     description: '',
    //     actors:[],
    //     releaseDate: '',
    //     posterUrl: '',
    //     featured: false,
    //     language: '',
    //     genre: '',
    //     duration: '',
    // })
 const[newMovies,setNewMovies]=useState({
       ...props.data,
       featured:props.data?.featured || '',
       language:props.data?.language || '',
       genre:props.data?.genre || '',
       date:props.data?.date||'',

 })

   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMovies({
          ...newMovies,
          [name]: value,
        });
      };
     
      const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setNewMovies({
          ...newMovies,
          [name]: checked,
        });
        
      };

      useEffect(() => {
        // Function to validate the token
        const token= localStorage.getItem("token")
        console.log(token)
        
        if(!token)
        {
          navigate('/unauth')
        }
    
        // Validate the token when the component mounts
    
      }, [token, navigate]);
    
const addMovies=(e)=>{
  const token= localStorage.getItem("token")
    e.preventDefault();
    let data= {
         ...newMovies,
        // title:newMovies.title,
        // description: newMovies.description,
        // // actors:newMovies.actors,
        // releaseDate: newMovies.releaseDate,
        // posterUrl:newMovies.posterUrl,
        // featured:newMovies.featured,
        // language:newMovies.language,
        // genre: newMovies.genre,
        // duration:newMovies.duration,
         actors: newMovies.actors.split(',').map((actor) => actor.trim()), 
         token:token,// Split into an array
      };
     console.log("data",data)
  
  if(props.method==='post'){
   
      axios.post('http://localhost:5000/api/movies/', data)
        .then((response) => {

          if (response.status===201) {
            alert(response.data.message);
           
            navigate('/theaterdashboard')
        
          } else 
          if(response.data.message==='Unauthorized User')
          {
            alert(response.data.message);
            return navigate("/unauth")
          }
          else {
            alert(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
      
if (props.method === "put") {
  axios
    .put("http://localhost:5000/api/movies/" + newMovies._id, newMovies)
    .then((response) => {
      if (response.data.message === "Updated succesfully") {
        alert(response.data.message);
        navigate('/theaterdashboard')
       
      } else {
        alert(response.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });

}
setIsFormOpen(false); 
}
const handleCancel = () => {
  // Add logic to cancel the addition of a movie (e.g., clear form fields)
  
  setIsFormOpen(false);
  navigate('/theaterdashboard')
};
const handleCloseDialog = () => {
  // Close the dialog when the CloseRoundedIcon is clicked
  console.log('btn clicked')
  setIsFormOpen(false);
};
  return (
  
    <div className='conatiner' >
      
        <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} >
       
      
      <Form className='container'>
      <Box sx={{ ml: "auto", padding: 1 }}>
      <IconButton component={Link} to="/theaterdashboard">
            <CloseRoundedIcon onClick={handleCloseDialog} />
          </IconButton>
      </Box>
          <h1>Add Movie</h1>
        <Form.Group controlId="name">
          <Form.Label>Movie Name</Form.Label>
          <Form.Control
            type="text"
            name="title"
           value={newMovies.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Movie Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
          value={newMovies.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="actors">
          

          <Form.Label>Actors (comma-separated)</Form.Label>
        <Form.Control
          type="text"
          name="actors"
          value={newMovies.actors}
          onChange={handleInputChange}
          required
        />
        </Form.Group>

        <Form.Group controlId="details">
          <Form.Label>Details</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              name="duration"
              placeholder="Duration"
             value={newMovies.duration}
             onChange={handleInputChange}
              className="mr-2"
            />
            <Form.Control
              type="date"
              name="releaseDate"
              placeholder="Release Date"
             value={newMovies.releaseDate}
             onChange={handleInputChange}
              className="mr-2"
            />
            
            <Form.Control
          as="select"
          name="language"
          value={newMovies.language}
          onChange={handleInputChange}
         className="mr-2"
          >
      <option value="">Select Language</option>
      {language.map((languageOption) => (
        <option key={languageOption} value={languageOption}>
          {languageOption}
        </option>
      ))}
      {/* Add more language options */}
    </Form.Control>
          </div>
        </Form.Group>
        <Form.Group controlId="genre">
        {/* <Form.Label>Genre</Form.Label> */}
          <div className="d-flex">
          
            <Form.Control
              as="select"
              name="genre"
              value={newMovies.genre}
              onChange={handleInputChange}
              className="mr-2"
              style={{ flex: '1' }}
            >
              <option value="">Select a genre</option>
              {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
            </Form.Control>
          
            <Form.Control
              type="text"
              name="posterUrl"
              placeholder="Poster URL"
             value={newMovies.posterUrl}
             onChange={handleInputChange}
              style={{ flex: '2' }}
            />

           
        
          </div>

        </Form.Group>
        <Form.Group controlId="name">
          
          <Form.Check
         type="checkbox"
         label="Featured"
          name='featured'
         checked={newMovies.featured}
         onChange={handleCheckboxChange}

        />

        </Form.Group>
        <Form.Group controlId="button" className=' button text-center '>
        <Button variant="secondary"  className="cancel-button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary"  className="ml-2 submit-button" onClick={addMovies} >
          Save
        </Button>
        </Form.Group>
      </Form>
     
      </Dialog>
       
    </div>
  )
}

export default AddMovies