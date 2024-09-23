import React from 'react';
import img1 from '../../images/ShelterImage.jpeg';
import img2 from '../../images/ShelterImageTwo.jpeg';
import './landingPage.css';

const LandingPage = () => {
  return (
    
    <div className="mt-5 containerLanding">
      <div className="text-center">
        <h1 className="headingLanding mb-4 display-4">Community | Collaboration | Shelters</h1>
      </div>
      <div className="mt-5 d-flex justify-content-center">
        <div className="landing-page-img-container">
          <img src={img2} alt="UsersImage" className="landing-page-img" />
        </div>
        <div className="landing-page-img-container">
          <img src={img1} alt="ShelterImage" className="landing-page-img" />
        </div>
      </div>
      
      <div className="containerLandingBottom">
        <div className="half-width">
          <h2>All Irish Shelters In One Place</h2>
          <ul className="list-group">
            <li className="list-group-item">Find shelters near you</li>
            <li className="list-group-item">View available animals</li>
            <li className="list-group-item">Learn about adoption process</li>
            <li className="list-group-item">Contact shelters</li>
          </ul>
          <div className="registerButton">
            <button className="btn btn-warning">Register</button>
          </div>
        </div>
        <div className="half-width">
          <h2>Have You Lost or Found a Pet?</h2>
          <ul className="list-group">
            <li className="list-group-item">Report a lost pet</li>
            <li className="list-group-item">Search for found pets</li>
            <li className="list-group-item">Contact owners</li>
            <li className="list-group-item">Get assistance</li>
          </ul>
          <div className="registerButton">
            <button className="btn btn-success">Register</button>
          </div>
        </div>
      </div>
      <div><h1>Yes</h1></div>
    </div>
  );
};

export default LandingPage;
