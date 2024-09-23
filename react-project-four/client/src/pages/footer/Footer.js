import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis tempor dolor. Nullam posuere velit vitae diam vulputate, vel malesuada nulla vehicula.</p>
          </div>
          <div className="col-md-4">
            <h3>Contact Us</h3>
            <p>Email: info@dogohome.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
          <div className="col-md-4">
            <h3>Follow Us</h3>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Dogo Home. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;