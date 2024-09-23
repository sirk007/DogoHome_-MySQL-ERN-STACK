// ... (previous code)

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

// ... (remaining code)