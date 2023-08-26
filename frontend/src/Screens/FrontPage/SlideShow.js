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
    <div className="container-fluid m-0">
      <img
        width="100%"
        height={100}
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        style={{ boxShadow: "1px 1px 4px 2px gray", marginBottom: "15px" }}
      />
    </div>
  );
};

export default { Slideshow };

export function Result(props) {
  const boxes = props.notes?.map((item, index) => {
    return (
      <Box
        key={index}
        category={item.category}
        title={item.title}
        author={item.author}
      />
    );
  });
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        gap: "50px",
        marginTop: "10px",
      }}
    >
      {boxes}
    </div>
  );
}

const Box = (props) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <a href={`/contents/${props.category.replace(/ /g, " ").toLowerCase()}`}>
      <div
        style={{
          boxShadow: isHovering ? "2px 2px 10px 2px rgb(24,120,200)" : " ",
          marginTop: "20px",
          height: "120px",
          backgroundColor: "rgba(24,120,200,.4)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
          paddingTop: 10,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span style={{ fontSize: "20px", marginTop: "20px" }}>
          {props.title}
        </span>
        <footer
          style={{ color: "red", position: "absolute", bottom: 2, right: 2 }}
        >
          {" "}
          _{props.author}
        </footer>
      </div>
    </a>
  );
};
