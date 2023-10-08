import React, { useState, useEffect } from "react";
import './FrontPage.css';

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


//--------------------------------------------------------------------------------------------

export function Result(props) {
  const boxes = props.notes?.map((item, index) => {
    return (
      <Box
        key={index}
        category={item.category}
        title={item.title}
        author={item.author}
        id={item._id}
      />
    );
  });
  return (
    <div 
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(330px,1fr))",
        overflow: "hidden",
        textOverflow: "ellipsis",
        gap: "30px",
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
    <a href={`/content/${props.id}/${props.category}/${props.title}`}>
      <div className="noteBox container-fluid "
        style={{
          boxSizing:"border-box",
          boxShadow: isHovering ? "1px 1px 10px .5px " : " ",
          border: "2px solid",
          borderRadius: "8px",
          marginTop: "20px",
          height: "120px",
          backgroundColor: "#c5e3ed",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
          paddingTop: 10,
          fontFamily: "cursive",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          style={{
            display: "-webkit-box",
            webkitBoxOrient: "vertical",
            WebkitLineClamp: "2",
            height: "60px",
            overflow: "hidden",
            fontSize: "20px",
            marginTop: "20px",
          }}
        >
          {props.title}
        </div>
        <footer
          style={{
            color: "#220361",
            position: "absolute",
            bottom: 2,
            right: 2,
          }}
        >
          {" "}
          -{props.author}
        </footer>
      </div>
    </a>
  );
};
