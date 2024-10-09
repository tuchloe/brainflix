
import React from 'react';
import '../App.css'; 

const Comments = ({ comments }) => {
  return (
    <div className="comments">
      <h2>{comments.length} Comments</h2>
      {}
      <div className="comments__new">
        <div className="comments__new__container">
          <img 
            src="./assets/Images/Mohan-muruge.jpg" 
            alt="User Display" 
            className="comments__new__user-image" 
          />
          <div className="comments__new__container__within">
          <h3>JOIN THE CONVERSATION</h3>
          <input
            type="text"
            placeholder="Add a new comment"
            className="comments__new__input"
          />
          </div>
          <button className="comments__new__button"><img src="./assets/Icons/add_comment.svg"></img> COMMENT</button>
        </div>
      </div>

      {}
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment.id} className="comments__item">
            <div className="comments__item__image-container">
              <img
                src="n/a"
                alt={`${comment.name}'s Display`}
                className="comments__item__user-image"
              />
            </div>
            <div className="comments__item__content">
              <div className="comments__item__header">
                <strong>{comment.name}</strong>
                <p className="comments__item__date">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </p>
              </div>
              <p>{comment.comment}</p> {}
            </div>

          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default Comments;

