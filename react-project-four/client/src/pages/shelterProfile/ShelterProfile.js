import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './shelterProfilePage.css';

function ShelterProfile() {
  let { id } = useParams();
  const [shelterData, setShelterData] = useState({
    username: "",
    email: "",
    shelterName: "",
    county: "",
    address: "",
    phoneNumber: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:3002/auth/shelter/basicinfo/${id}`).then((response) => {
      setShelterData({
        username: response.data.username,       // Fetch username
        email: response.data.email,             // Fetch email
        shelterName: response.data.shelterName, // Fetch shelterName
        county: response.data.county,           // Fetch county
        address: response.data.address,         // Fetch address
        phoneNumber: response.data.phoneNumber  // Fetch phoneNumber
      });
    });
  }, [id]);

  return (
    <div className="container shelterProfilePage mt-5">
      <h1>Shelter Profile</h1>
      <div className="row">
        <div className="col-md-6">
          <p><strong>Username:</strong> {shelterData.username}</p>
          <p><strong>Email:</strong> {shelterData.email}</p>
          <p><strong>Shelter Name:</strong> {shelterData.shelterName}</p>
          <p><strong>County:</strong> {shelterData.county}</p>
          <p><strong>Address:</strong> {shelterData.address}</p>
          <p><strong>Phone Number:</strong> {shelterData.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default ShelterProfile;
