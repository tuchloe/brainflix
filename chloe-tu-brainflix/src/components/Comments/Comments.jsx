import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import axios from 'axios';
import '../Comments/Comments.css';

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      if (!videoId) return;

      try {
        const url = `${API_URL}/videos/${encodeURIComponent(videoId)}`;
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

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return; 

    try {
      const response = await axios.post(
        `${API_URL}/videos/${encodeURIComponent(videoId)}/comments`,
        { comment: newComment }
      );

      if (response.status === 201) {
        setComments((prevComments) => [
          ...prevComments,
          response.data,
        ]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="comments">
      <h2>{comments.length} Comments</h2>
      <div className="comments__new">
        <div className="comments__new-container">
          <img 
            src="./assets/Images/Mohan-muruge.jpg" 
            alt="User Display" 
            className="comments__new-user-image" 
          />
          <div className="comments__new-container-within">
            <h3 className="comments__new-title">JOIN THE CONVERSATION</h3>
            <input
              type="text"
              placeholder="Add a new comment"
              className="comments__new-input"
              value={newComment}
              onChange={handleCommentChange}
            />
          </div>
          <button
            className="comments__new-button"
            onClick={handleCommentSubmit}
          >
            COMMENT
          </button>
        </div>
      </div>

      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment.id} className="comments__item">
            <div className="comments__item-image-container">
              <img
                src="n/a"
                alt={`${comment.name}'s Display`}
                className="comments__item-user-image"
              />
            </div>
            <div className="comments__item-content">
              <div className="comments__item-header">
                <strong>{comment.name}</strong>
                <p className="comments__item-date">
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
