import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const NextVideos = ({ videos, selectedVideoId, onVideoSelect }) => {
  return (
    <section className="next-videos">
      <h2 className="next-videos__title">NEXT VIDEOS</h2>
      <div className="next-videos__list">
        {videos
          .filter(video => video.id !== selectedVideoId) // Filter out the selected video
          .map(video => (
            <Link
              to={`/videos/${video.id}`}
              key={video.id}
              className="next-videos__list__item"
              onClick={() => onVideoSelect(video)}
            >
              <img src={video.image} alt={video.title} />
              <div>
                <p className="next-videos__list__item__title">{video.title}</p>
                <p>{video.channel}</p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default NextVideos;
