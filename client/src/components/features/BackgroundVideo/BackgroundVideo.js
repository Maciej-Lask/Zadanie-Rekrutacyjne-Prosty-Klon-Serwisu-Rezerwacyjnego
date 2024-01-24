import React, { useState, useEffect } from 'react';
import bgVideo from '../../../videos/bg.mp4';
import styles from './BackgroundVideo.module.scss';

const BackgroundVideo = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = [
    'Book your appointment and refresh your look!',
    'Discover a new dimension of relaxation - schedule a beauty treatment today!',
    'Feel relaxed and beautiful - book a massage online!',
  ];


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 7000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [texts.length]);

  return (
    <div className={styles.root}>
      <video autoPlay muted loop className={styles.video}>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className={styles.overlay}>
        <h1 className={styles.text}>{texts[currentTextIndex]}</h1>
      </div>
    </div>
  );
};

export default BackgroundVideo;
