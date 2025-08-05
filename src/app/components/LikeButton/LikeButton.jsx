import React, { useState, useEffect } from 'react';
import styles from './LikeButton.css';

const HEART_PATH = "M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z";

export default function LikeButton() {
  const [hasLiked, setHasLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(() => {
    const storedLikes = localStorage.getItem('totalLikes');
    return storedLikes ? parseInt(storedLikes, 10) : 0;
  });

  useEffect(() => {
    const storedHasLiked = localStorage.getItem('hasLiked');
    if (storedHasLiked === 'true') {
      setHasLiked(true);
    }
  }, []);

  const handleLike = () => {
    if (hasLiked) return;

    const newTotalLikes = totalLikes + 1;
    setTotalLikes(newTotalLikes);
    setHasLiked(true);

    localStorage.setItem('totalLikes', newTotalLikes);
    localStorage.setItem('hasLiked', 'true');
  };

  return (
    <div className={styles.likeButtonContainer}>
      <button
        className={styles.heartButton}
        onClick={handleLike}
        disabled={hasLiked}
        aria-label="Like Button"
      >
        <svg
          viewBox="0 0 20 20"
          className={styles.heartSvg}
          style={{ width: '24px', height: '24px' }}
        >
          <path
            d={HEART_PATH}
            fill={hasLiked ? "red" : "transparent"}
            stroke={hasLiked ? "red" : "red"}
            strokeWidth="1"
          />
        </svg>
      </button>

      <div className={styles.likeCounter}>
        <span>{totalLikes}</span>
      </div>
    </div>
  );
}
