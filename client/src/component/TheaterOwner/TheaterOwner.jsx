

import React, { useEffect, useState } from 'react';
import { Tab, Tabs, Table } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AddMovies from '../Movies/AddMovies'


function TheaterOwner () {
  const [activeTab, setActiveTab] = useState('theaters'); // 'theaters' or 'shows'
  const[movies,setMovies]=useState([])
  const[showData,setShowData]=useState([])
  const[update,setUpdate]=useState(false)
  const[singlevalue,setSingleValue]=useState(null)





  useEffect(()=>{
    axios.get('http://localhost:5000/api/movies').then((response)=>{

   
    setMovies( response.data.movies )

     console.log(movies)
    
    }).catch((error)=>{
      console.log(error)

    })

  },[])
  useEffect(() => {
    // Fetch show data when the "Shows" tab is selected
    if (activeTab === 'shows') {
      axios.get('http://localhost:5000/api/shows/')
        .then((response) => {
          setShowData(response.data.shows);
          console.log(showData)
        })
        .catch((error) => {
          console.error('Error fetching shows:', error);
        });
    }
  }, [activeTab]);

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
 let finalJsx= <div>
 <h1>Movie Details</h1>
 <div className='pt-1'>

 <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
   <Tab eventKey="movies" title="Movies">
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
          
           
           {/* Add more columns as needed */}
           <th>Actions</th>
         </tr>
       </thead>
       {/* Add table body */}
       <tbody>
         {/* Map through your theater data and render rows */}
         {movies&&movies.map((movies,index) => (
           <tr key={index}>
             <td> <img height={"5%"} width="25%" src={movies.posterUrl} alt={movies.title}></img>  </td>
             <td>{movies.title}</td>
             <td>{movies.description}</td>
             <td>{movies.releaseDate}</td>
             <td>{movies.actors}</td>
             <td>{movies.duration}</td>
             <td>{movies.featured ?'true':'false'}</td>
             
          
             {/* Add more columns as needed */}
             <td><button className="btn btn-primary" onClick={()=>EditMovie(movies)}>
                 <i className="fas fa-edit"></i> Edit
             </button>
            
             <button className="btn btn-danger ml-2"onClick={()=>deleteMovie(movies._id)}>
                 <i className="fas fa-trash-alt" ></i> Delete
               </button>
               <Link to="/addmovies"><span>Add Movies</span> </Link>
             
               
              {/* <Link to="/shows"><span>AddShows</span> </Link> */}
               </td>
             
           </tr>
         ))}
       </tbody>
     </Table>
   </Tab>

   <Tab eventKey="shows" title="Shows">
     {/* Shows Tab Content */}
     <Table striped bordered hover>
       {/* Add table headers */}
       <thead>
         <tr>
           <th>Show Name</th>
           <th>Movie</th>
           <th>Date</th>
           <th>Time</th>
           <th>Total Seats</th>
          
           <th>Ticket Price</th>
          
           <th>Available Seates</th>
           <th>Action</th>
           {/* Add more columns as needed */}
         </tr>
       </thead>
       {/* Add table body */}
       <tbody>
         {/* Map through your show data and render rows */}



         {showData&& showData.map((shows,index) => (
           <tr key={index}>
             <td>{shows.showName}</td>
             <td>{shows.title}</td>
             <td>{shows.date}</td>
             <td>{shows.time}</td>
             <td>{shows.totalSeats}</td>
             <td>{shows.ticketprice}</td>
             <td>{shows.availableSeats}</td>
             
        
             {/* Add more columns as needed */}
             <td>
             <td><button className="btn btn-primary">
                 <i className="fas fa-edit"></i> Edit
             </button>
            
             <button className="btn btn-danger ml-2">
                 <i className="fas fa-trash-alt"></i> Delete
               </button>
            
               </td>


             </td>
           </tr>
         ))}


         
       
       </tbody>
     </Table>
   </Tab>
 </Tabs>
</div>
</div>
if(update) finalJsx =<AddMovies method='put' data={singlevalue}/>
  return (
 
    finalJsx
  );
}

export default TheaterOwner