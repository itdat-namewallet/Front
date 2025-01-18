import React, { useRef, useEffect, useState } from 'react';
import '../../assets/css/main/myWallet.css';
import videoSrc from '../../assets/video/mywallet.mp4';

const MyWallet = () => {
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
    <div className="mywallet">
      <div className="mywallet-content">
        <h2>공유 받은 명함의 손쉬운 관리</h2>
        <p>
          공유받은 명함을 나의 명함첩에서<br />
          폴더로 손쉽게 관리하고 확인해 보세요.
        </p>
      </div>
      <div className="mywallet-video-container">
        <video
          ref={videoRef}
          src={videoSrc}
          type="video/mp4"
          muted
          loop
          className="mywallet-video"
        />
      </div>
    </div>
  );
};

export default MyWallet;
