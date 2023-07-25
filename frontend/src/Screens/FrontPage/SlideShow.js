import React, { useState, useEffect } from "react";

const Slideshow = ({ images, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Function to handle the automatic slideshow
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [images.length, interval]);

  return (
    <div className="slideshow">
      <img
        width={700}
        height={400}
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        style={{ boxShadow: "1px 1px 4px 2px gray",marginBottom:"15px" }}
      />
    </div>
  );
};

export default Slideshow;
