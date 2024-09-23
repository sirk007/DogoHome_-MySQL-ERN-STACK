import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LogoutButton = ({ setAuthState }) => {
  const navigate = useNavigate();

  const logout = () => {
    const userToken = sessionStorage.getItem("accessToken");
    const adminToken = sessionStorage.getItem("accessAdminToken");
    const shelterToken = sessionStorage.getItem("accessShelterToken");
  
    // Remove session tokens based on existing session token
    if (userToken) {
      sessionStorage.removeItem("accessToken");

    }
    if (adminToken) {
      sessionStorage.removeItem("accessAdminToken");
    }
    if (shelterToken) {
      sessionStorage.removeItem("accessShelterToken");
    }
  
    // Reset authState to indicate logout
    setAuthState({
      username: "",
      id: 0,
      userType: "",
      status: false
    });
    navigate('/');
  };

  return (
    <button variant="outline-danger" onClick={logout}>Logout</button>
  );
};

export default LogoutButton;
