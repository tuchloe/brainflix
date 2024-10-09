
import React from 'react';
import '../App.css';

const NextVideos = ({ videos, onVideoSelect }) => {
  return (
    <section className="next-videos">
      <h2 className="next-videos__title">NEXT VIDEOS</h2>
      <div className="next-videos__list">
        {videos.map(video => (
          <div
            key={video.id}
            className="next-videos__list__item"
            onClick={() => onVideoSelect(video)
            }
          >
            <img src={video.image} alt={video.title} />
            <div>
              <p className="next-videos__list__item__title">{video.title}</p>
              <p>{video.channel}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NextVideos;
