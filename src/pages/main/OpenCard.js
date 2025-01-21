import React, { useRef, useEffect, useState } from 'react';
import '../../assets/css/main/openCard.css';
import videoSrc from '../../assets/video/opencard.mp4';

const OpenCard = () => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        const isInViewport =
          rect.top >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);

        setIsVisible(isInViewport);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const playPromise = isVisible ? video.play() : video.pause();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Video playback issue:', error);
        });
      }
    }
  }, [isVisible]);

  return (
    <div className="opencard">
    <div className="opencard-content">
        <h2>나의 가치를 공개해보세요</h2>
        <p>
          명함을 공개 설정하면 나의 명함을<br />
          많은 사람들이 확인할 수 있습니다.
        </p>
    </div>

        <div className="opencard-video-container">
            <video
            ref={videoRef}
            src={videoSrc}
            type="video/mp4"
            muted
            loop
            className="opencard-video"
            />
        </div>
    </div>
  );
};

export default OpenCard;
