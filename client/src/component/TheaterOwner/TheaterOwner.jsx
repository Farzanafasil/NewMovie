

import React, { useEffect, useState } from 'react';

import { Tab, Tabs, Table, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AddMovies from '../Movies/AddMovies'
import Sidebar from './Sidebar';



function TheaterOwner () {
  const [activeTab, setActiveTab] = useState('theaters'); // 'theaters' or 'shows'
  const[movies,setMovies]=useState([])
  const[showData,setShowData]=useState([])
  const[update,setUpdate]=useState(false)
  const[singlevalue,setSingleValue]=useState(null)
  const [movieEdited, setMovieEdited] = useState(false);
  const navigate=useNavigate()
  const[searchQuery,setSearchQuery]=useState('')
 
  const theaterId=localStorage.getItem("theaterId")
  const token= localStorage.getItem("token")


  useEffect(()=>{
    if(!token){
      console.log('auth display message');
      navigate('/unauth'); // Redirect to the login page
      return;
    }
    
    axios.get('http://localhost:5000/api/movies').then((response)=>{

   
    setMovies( response.data.movies )

     console.log(movies)
    
    }).catch((error)=>{
      console.log(error)

    })

  },[])
  // useEffect(() => {
  //   // Fetch show data when the "Shows" tab is selected
  //   if (activeTab === 'shows') {
  //     axios.get('http://localhost:5000/api/shows/')
  //       .then((response) => {
  //         setShowData(response.data.shows);
  //         console.log(showData)
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching shows:', error);
  //       });
  //   }
  // }, []);
  const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
   );
  

  const deleteMovie=(id)=>{
  console.log(id)

  axios.delete('http://localhost:5000/api/movies/' + id).then((response) => {
    alert(response.data.message);
    window.location.reload(false);
  });
   
  }
  const EditMovie=(value)=>{
    setUpdate(true);
    setSingleValue(value)
    
  

  }
  const handleMovieEdited = () => {
    setUpdate(false); // Close the edit form
    // Redirect to the "Movies" tab
     // Use the route path for your dashboard
     if (activeTab === 'theaters') {
      navigate('/theaterdashboard#movies'); // Redirect to 'theaters' tab
    } else if (activeTab === 'shows') {
      navigate('/theaterdashboard#shows'); // Redirect to 'shows' tab
    }

  };
  
 let finalJsx= <div>
   <Sidebar />
 <h1>Movie Details</h1>
 <div className='pt-1'>
 <div className="table-header">
 <div className="add-movie-button" style={{ position: 'relative', marginBottom: '20px' }}>
  <Button
    variant="primary"
    onClick={() => navigate('/addmovies')}
    style={{
      position: 'absolute',
      top: '0',
      right: '0',
      marginTop: '10px',
      marginRight: '10px',
    }}
  >
    <i className="fas fa-plus"></i> Add Movie
  </Button>
</div>
    <div style={{ marginBottom: '20px' }}>


       <h2>Movies List</h2>
        <InputGroup className="mb-3">
       <FormControl
            placeholder="Search by movie title"
            onChange={(e) => setSearchQuery(e.target.value)}
             value={searchQuery}
           />
           <Button variant="outline-secondary">Search</Button>
        </InputGroup>
      </div>
      </div>
     {/* Theater Tab Content */}
     <Table striped bordered hover>
       {/* Add table headers */}
       <thead>
         <tr>
         <th>Image</th>
           <th>title</th>
           <th>description</th>
           <th>releaseDate</th>
           <th>actors</th>
           <th>duration</th>
           <th>featured</th>
           <th>Actions</th>
         </tr>
       </thead>
       {/* Add table body */}
       <tbody>
         {/* Map through your theater data and render rows */}
         {movies&&filteredMovies.map((movies,index) => (
           <tr key={index}>
             <td> <img height={"5%"} width="25%" src={movies.posterUrl} alt={movies.title}></img>  </td>
             <td>{movies.title}</td>
             <td>{movies.description}</td>
             <td>{new Date(movies.releaseDate).toDateString()}</td>
             <td>{movies.actors}</td>
             <td>{movies.duration}</td>
             <td>{movies.featured ?'true':'false'}</td>
             
          
             {/* Add more columns as needed */}
             <td>
  <div className="d-flex">
    <button className="btn btn-primary" onClick={() => EditMovie(movies)}>
      <i className="fas fa-edit"></i>
    </button>

    <button className="btn btn-danger ml-2" onClick={() => deleteMovie(movies._id)}>
      <i className="fas fa-trash-alt"></i>
    </button>
  </div>
</td>
             
           </tr>
         ))}
       </tbody>
     </Table>
  

</div>
</div>
if(update) finalJsx =<AddMovies method='put' data={singlevalue}  onMovieEdited={handleMovieEdited} />
  return (
 
    finalJsx
  );
}

export default TheaterOwner


