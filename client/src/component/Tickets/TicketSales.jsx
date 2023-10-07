import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../TheaterOwner/Sidebar';


function TicketSales() {
  
  const [totalTicketSales, setTotalTicketSales] = useState(null);
  const[movieId,setMovieId]=useState('');
  const[date,setDate]=useState('')
  const[movieoption,setmovieOption]=useState([])
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    border: '1px solid #ddd',
  };
  
  const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '8px',
    textAlign: 'left',
  };
  
  const tdStyle = {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  };

  useEffect(()=>{
  axios.get('http://localhost:5000/api//movies').then((response)=>{

    setmovieOption(response.data.movies)

  }).catch((error)=>{
    console.log(error)
  })


  },[])
 
  const fetchTotalCollection=()=>{
    console.log('Fetching data for movieId:', movieId, 'and date:', date)
    axios.get(`http://localhost:5000/api/totalcollection/${movieId}/${date}`).then((response)=>{

      
        setTotalTicketSales(response.data);
    
        console.log(totalTicketSales)
      
     
    }).catch((error)=>{
      console.log(error)
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTotalCollection();
  };
  
const handleDateChange=(e)=>{
  setDate(e.target.value);
  console.log('date is:',date)

}
const movieIdHandle=(e)=>{
  setMovieId(e.target.value)

  console.log('movieId is:' ,movieId);
}
  return (
    <div>
      <Sidebar/>
      <div style={{color:'red'}}>
      <h2 style={{textAlign:'center'}}>Fetch Total Collection</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select a Movie:
         <select value={movieId} onChange={movieIdHandle}>
         <option value=''>Select a movie</option>
         {movieoption.map((movies,index)=>(
          <option key={index} value={movies._id}>{movies.title}</option>
         ))}
         </select>
        </label>
        <br />
        <label htmlFor="datePicker">Select Date:</label>
      <input
        type="date"
        id="datePicker"
        value={date}
        onChange={handleDateChange}
      />
        <br />
        <button type="submit">Fetch Total Collection</button>
      </form>

      {totalTicketSales !== null && (
        <div>
          <h3>Total Collection:</h3>
          <table style={tableStyle} className="collection-table">
  <thead>
    <tr>
      <th style={thStyle}>Movie ID</th>
     
      <th style={thStyle}>Date</th>
      <th style={thStyle}>Total Collection</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={tdStyle}>{movieId}</td>
    
      <td style={tdStyle}>{date}</td>
      <td style={tdStyle}>{totalTicketSales.totalCollection}</td>
     
    </tr>
  </tbody>
</table>
        </div>
      )}
    </div>
    </div>
  );
}

export default TicketSales;