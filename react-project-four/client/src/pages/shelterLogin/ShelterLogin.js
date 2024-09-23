import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../helpers/AuthContext';
import './shelterLogin.css';


function ShelterLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3002/auth/shelter/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {

        sessionStorage.setItem("accessShelterToken", response.data.token);
        setAuthState({
          id: response.data.id,
          username: response.data.username,
          userType: response.data.userType,
          email: response.data.email,
          shelterName: response.data.shelterName,
          county: response.data.county,
          address: response.data.address,
          phoneNumber: response.data.phoneNumber,
          status: true});
        navigate("/");
      }
    });
  };
  return (
    <div className="loginShelterContainerWrapper">
      <div className="container loginShelterContainer mt-5">
        <div className="loginShelterForm">
          <h2 className="text-center">Shelter Login</h2>
          <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="username" className="form-label"></label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label"></label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="">
              <button onClick={login} className="btn btn-primary" type="button">Login</button>
            </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ShelterLogin;