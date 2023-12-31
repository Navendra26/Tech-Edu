import React, { useState, useEffect } from "react";
import './FrontPage.css';

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
        gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
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
          backgroundImage: "linear-gradient(to top, #c4ecea, #c4eee5, #c7efde, #ccf0d7, #d4f0cf)"
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
