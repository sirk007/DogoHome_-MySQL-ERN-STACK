import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../../helpers/AuthContext';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const {authState} = useContext(AuthContext);

  let navigate = useNavigate(); 


  useEffect(() => {
    axios.get(`http://localhost:3002/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3002/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3002/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = { commentBody: newComment, username: response.data.username };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3002/comments/${id}`, {
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      })
    .then(()=>{
      setComments(comments.filter((val) =>{
        return val.id !== id;
      }));
    });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3002/posts/${id}`, {
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/");
      });
  };

  const editPost = (option) =>{
    if (option === "title"){
      let newTitle = prompt("Enter New Title:");
      axios.put("http://localhost:3002/posts/title",{
        newTitle: newTitle,
        id: id,
      },{
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      }
      );
      setPostObject ({...postObject, title: newTitle});
    } else{
      let newPostText = prompt("Enter New Post Text:");
      axios.put("http://localhost:3002/posts/postText",{
        newText: newPostText,
        id: id,
      },{
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      }
      );

      setPostObject ({...postObject, postText: newPostText});

    }
  }

  return (
    <div className="postPage">
      <div className="leftSide">
      <div className="post" id="individual">
          <div className="card card-container">
            <div className="card-body">
              <h5 className="card-title font-weight-bold" onClick={() => {
                if (authState.username === postObject.username) {
                  editPost("title");
                }
              }}>
                Title: {postObject.title}
              </h5>
              <p className="card-text font-weight-bold" onClick={() => {
                if (authState.username === postObject.username) {
                  editPost("body");
                }
              }}>
                <h5>Description:</h5><br />{postObject.postText}
              </p>
              <div className="card-footer d-flex justify-content-between align-items-center">
                {postObject.username} {
                  authState.username === postObject.username && (
                    <button className="btn btn-danger" onClick={() => {
                      deletePost(postObject.id);
                    }}>Delete</button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
        {comments.map((comment, key) => {
          return (
            <div key={key} className="comment">
              <div className="commentHeader">
                <h3>Comment by: {comment.username}</h3>
              </div>
              <div className="commentBody">
                {comment.commentBody}
              </div>
              <div className="commentFooter">
                {authState.username === comment.username && (
                  <button className="btn btn-primary" onClick={() => {deleteComment(comment.id);}}>Delete</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

export default Post;