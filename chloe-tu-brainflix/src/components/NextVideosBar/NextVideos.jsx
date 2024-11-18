import React from 'react';
import { Link } from 'react-router-dom';
import '../NextVideosBar/NextVideos.css';

const NextVideos = ({ videos, selectedVideoId, onVideoSelect }) => {
  return (
    <section className="next-videos">
      <h3 className="next-videos__title">NEXT VIDEOS</h3>
      <div className="next-videos__list">
        {videos
          .filter(video => video.id !== selectedVideoId)
          .map(video => (
            <Link
              to={`/videos/${video.id}`}
              key={video.id}
              className="next-videos__list-item"
              onClick={() => onVideoSelect(video)}
            >
              <img
                src={video.image}
                alt={video.title}
                className="next-videos__list-item-image"
              />
              <div className="next-videos__list-item-content">
                <p className="next-videos__list-item-title">{video.title}</p>
                <p className="next-videos__list-item-channel">{video.channel}</p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default NextVideos;
