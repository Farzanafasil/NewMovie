import React from 'react'
import {Link} from 'react-router-dom'
import './Sidebar.css'


const Sidebar = () => {
  return (
    <div><div className="sidebar">
    <div className="logo">
      <h2>Your Theater</h2>
    </div>
    <ul>
      <li>
        <Link to="/theaterprofile">  <i className="fas fa-user" title="My Profile"></i></Link>
      </li>
      <li>
        <Link to="/addmovies"> <i className="fas fa-film" title='Add Movies'></i> </Link>
      </li>
      <li>
      <Link to="/ticketsales"><i className="fas fa-money-bill-alt" title='collection'></i> </Link>
      </li>
      <li>
      <Link to="/moviesreviews"><i className="fa fa-comment" title='Reviews'></i> </Link>
      </li>
      
      {/* Add more sidebar links as needed */}
    </ul>
  </div></div>
  )
}

export default Sidebar