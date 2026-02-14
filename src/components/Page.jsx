import React, { useState, useEffect } from 'react';

const Page = ({ id, pageNum, maxPages, isFlipped, onFlip, frontContent, backContent, className }) => {
  const [zIndex, setZIndex] = useState(maxPages - pageNum + 1);

  useEffect(() => {
    if (isFlipped) {
      setZIndex(maxPages + pageNum);
    } else {
      const timeout = setTimeout(() => {
        setZIndex(maxPages - pageNum + 1);
      }, 600); // Half of anim-speed (1.2s / 2)
      return () => clearTimeout(timeout);
    }
  }, [isFlipped, pageNum, maxPages]);

  return (
    <div
      id={id}
      className={`page ${className || ''} ${isFlipped ? 'flipped' : ''}`}
      style={{ zIndex }}
      onClick={() => onFlip(pageNum)}
    >
      <div className="page-face front">
        {frontContent}
      </div>
      <div className="page-face back">
        {backContent}
      </div>
    </div>
  );
};

export default Page;
