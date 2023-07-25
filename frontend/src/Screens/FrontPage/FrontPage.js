import React from "react";
import Title from "./Title";
import "./FrontPage.css";
import FrontpageContent from "./FrontpageContent";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import banner1 from "./images/banner1.jpg";
import banner2 from "./images/banner2.jpg";
import banner3 from "./images/banner3.jpg";
import Slideshow from "./SlideShow";

const FrontPage = () => {
  const images = [banner1, banner2, banner3];
  const interval = 3000;
  return (
    <>
      <Title />
      <marquee className="marquee">
        {" "}
        This is the best website for your up Skilling
      </marquee>
      <div style={{ textAlign: "center" }}>
        <Slideshow images={images} interval={interval} />
      </div>
      <div className="background">
        <Row>
          <Col className=" col-3 sidenav">
            <h5 className="pt-3 text-center">Our Contents</h5>
            <hr className="py-0" />
            <div className="list">
              <a href="/mynotes/informationtechnology">
                Information Technology
              </a>
              <a href="/mynotes/engineering">Engineering</a>
              <a href="/mynotes/healthcare">HealthCare</a>
              <a href="/mynotes/automotivetechnology">
                Automotive Technology
              </a>
              <a href="/mynotes/culinaryarts">Culinary Arts</a>
              <a href="/mynotes/constructiontrades">Construction Trades</a>
            </div>
            </Col>
            <Col>
            <div>
              <FrontpageContent />
            </div>
            </Col>
        </Row>
      </div>
    </>
  );
};

export default FrontPage;
