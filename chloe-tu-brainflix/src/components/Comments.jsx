import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const API_URL = 'https://unit-3-project-api-0a5620414506.herokuapp.com';
const API_KEY = 'b9839b31-b3b8-4a10-a6c4-541c7c4b9c28';

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!videoId) return;
      
      try {
        const url = `${API_URL}/videos/${encodeURIComponent(videoId)}/?api_key=${API_KEY}`;
        console.log('Fetching comments from URL:', url); 
        const response = await axios.get(url);
        
        
        if (Array.isArray(response.data.comments)) {
          setComments(response.data.comments);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      } 
    };

    fetchComments();
  }, [videoId]);

  return (
    <div className="comments">
      <h2>{comments.length} Comments</h2>
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
          <button className="comments__new__button">
            COMMENT
          </button>
        </div>
      </div>

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
              <p>{comment.comment}</p>
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
