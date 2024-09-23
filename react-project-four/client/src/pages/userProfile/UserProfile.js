import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './userProfile.css';


function UserProfile(){
    let {id} = useParams();
    let navigate = useNavigate();
    const [userData, setUserData] = useState({
      username: "",
      email: "",
      age: "",
    });
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3002/auth/basicinfo/${id}`).then((response) => {
            setUserData({
              username: response.data.username, // Fetch username
              email: response.data.email,       // Fetch email
              age: response.data.age            // Fetch age
            });
        });

        axios.get(`http://localhost:3002/posts/byuserId/${id}`).then((response) =>{
            setListOfPosts(response.data);      // Fetch The list of posts
        });
    }, [id]);

    return (
        <div className="container profilePageContainer">
          <div className="basicInfo">
            <h1 className="spacerOut">Username: {userData.username} </h1>
            <p className="spacerOut">Email: {userData.email}</p>
            <p className="spacerOut">Age: {userData.age}</p>
          </div>
          <div className="row">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="col-md-4"> {/* Adjust column width as needed */}
              <div className="post">
                <div className="title"> {value.title} </div>
                <div
                  className="body"
                  onClick={() => {
                    navigate(`/post/${value.id}`);
                  }}
                >
                  {value.postText}
                </div>
                <div className="footer">
                  <div className="username">{value.username}</div>
                  <div className="buttons">
                    <label> {value.Likes.length}</label>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserProfile;