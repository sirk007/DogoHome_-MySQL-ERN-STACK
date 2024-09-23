import React, {useContext} from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp } from 'react-icons/fa';
import { AuthContext } from '../../helpers/AuthContext';
import { Link } from 'react-router-dom';


function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const {authState} = useContext(AuthContext);
  let navigate = useNavigate();
  
  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")){
      navigate('/landingPage');
    }else {
    axios.get("http://localhost:3002/posts", {
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      })
      .then((response) => {
        setListOfPosts(response.data.listOfPosts);
        setLikedPosts(
          response.data.likedPosts.map((like) => {
            return like.PostId;
          })
        );
      });
    }
  }, [navigate, authState]);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3002/likes",
        { PostId: postId },
        { headers: { accessToken: sessionStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              return { ...post, Likes: response.data.liked ? [...post.Likes, 0] : post.Likes.slice(0, -1) };
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(likedPosts.filter((id) =>{
            return id !== postId;
            })
          );
        } else{
          setLikedPosts([...likedPosts, postId]);

        }
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {listOfPosts.map((value, key) => (
          <div className="col-lg-3 col-md-6 mb-4" key={key}>
            <div className="card h-100">
              <div className="card-body">
                <div className="animalBody">
                  <h5 className="card-title">{value.title}</h5>
                  <div className="image"></div>
                  <p className="card-text" onClick={() => navigate(`/post/${value.id}`)}>{value.postText}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <Link to={`/userProfile/${value.UserId}`} className="card-link">{value.username}</Link>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaThumbsUp
                        onClick={() => {
                          likeAPost(value.id);
                        }}
                        className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"}
                      />
                      <span className="ms-1">{value.Likes.length}</span>
                    </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
