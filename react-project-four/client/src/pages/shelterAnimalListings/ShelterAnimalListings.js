import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShelterAnimalListings = () => {
  const { id } = useParams(); // Get the id from URL parameter
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    if (id) { // Make sure id is not null
      fetchAnimals(id); // Fetch animals using shelterId
    }
  }, [id]);

  const fetchAnimals = async (shelterId) => {
    try {
      const response = await axios.get(`http://localhost:3002/auth/animals/byShelterId/${shelterId}`);
      setAnimals(response.data);
    } catch (error) {
      console.error('Error fetching animals:', error);
    }
  };
  
  return (
    <div className="container">
      <h1 className="text-center mt-4">Animal Listings for Shelter</h1>
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

export default ShelterAnimalListings;
