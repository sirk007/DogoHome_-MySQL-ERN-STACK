import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function UserProfilePage(){
    let {id} = useParams();
    const [userData, setUserData] = useState({
      username: "",
      email: "",
      age: "",
    });


    useEffect(() => {
        axios.get(`http://localhost:3002/auth/basicinfo/${id}`).then((response) => {
            setUserData({
              username: response.data.username, // Fetch username
              email: response.data.email,       // Fetch email
              age: response.data.age            // Fetch age
            });
        });
    }, [id]);

    return (
        <div className="profilePageContainer">
          <div className="basicInfo">
            <h1>Username: {userData.username} </h1>
            <p>Email: {userData.email}</p>
            <p>Age: {userData.age}</p>
          </div>
        </div>
      );
    }


export default UserProfilePage;