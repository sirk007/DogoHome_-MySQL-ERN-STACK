import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router

import './userShelterFilter.css';

const UserShelterFilter = () => {
  const [shelters, setShelters] = useState([]);
  const [filteredShelters, setFilteredShelters] = useState([]);
  const [countyFilter, setCountyFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3002/auth/shelter')
      .then(response => {
        setShelters(response.data);
        setFilteredShelters(response.data); // Initialize filtered shelters with all shelters
      })
      .catch(error => {
        console.error('Error fetching shelters:', error);
      });
  }, []);

  // Function to filter shelters by county
  const filterSheltersByCounty = () => {
    const filtered = shelters.filter(shelter => shelter.county.toLowerCase().includes(countyFilter.toLowerCase()));
    setFilteredShelters(filtered);
  };

  // Handle input change for county filter
  const handleCountyFilterChange = (e) => {
    setCountyFilter(e.target.value);
  };

  // Handle form submit for county filter
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    filterSheltersByCounty();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Shelters</h1>
      <form onSubmit={handleFilterSubmit} className="mb-3">
        <input
          type="text"
          placeholder="Enter county to filter"
          value={countyFilter}
          onChange={handleCountyFilterChange}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary mt-2">Filter</button>
      </form>
      <div className="row">
        {filteredShelters.map(shelter => (
          <div key={shelter.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{shelter.shelterName}</h5>
                <p className="card-text">{shelter.county}</p>
                <p className="card-text">{shelter.email}</p>
                <p className="card-text">{shelter.address}</p>
                <p className="card-text">{shelter.phoneNumber}</p>
                  <Link to={`/shelter/ShelterAnimalListings/${shelter.id}`} className="btn btn-primary">Profile</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserShelterFilter;
