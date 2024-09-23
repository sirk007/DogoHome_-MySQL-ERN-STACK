import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';

import './shelterLandingPage.css';

const ShelterLandingPage = () => {
  const [animals, setAnimals] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    // Fetch animals data from the backend when the component mounts
    if (authState && authState.id) {
      fetchAnimals(authState.id); // id == shelter.id
    }
  }, [authState]);

  const fetchAnimals = async (shelterId) => {
    try {
      // Fetch animals data from the backend using shelter ID
      const response = await axios.get(`http://localhost:3002/auth/animals/byShelterId/${shelterId}`);
      // Log the array returned from the API
      console.log("Animals:", response.data);
      // Update the animals state with the fetched data
      setAnimals(response.data);
    } catch (error) {
      // Log and handle error
    }
  };
  
  return (
    <div className="container">
      <h1 className="text-center mt-4">A place for listing animals for shelters updated</h1>
      <div className="row mt-4">
        {animals.map(animal => (
          <div key={animal.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Animal: {animal.animal}</h5>
                <p className="card-text">Name: {animal.animalName}</p>
                <p className="card-text">Age: {animal.animalAge} years</p>
                <p className="card-text">Health: {animal.animalHealth}</p>
                <p className="card-text">Description: {animal.animalDescription}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShelterLandingPage;
