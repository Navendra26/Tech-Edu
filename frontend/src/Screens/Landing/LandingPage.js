import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

   useEffect(() => {    // if user is logged in it navigate to /mynotes page (when Note Zipper having in the header is clicked )
     const userInfo = localStorage.getItem("userInfo");

     if(userInfo){
       navigate(-1);
     }
   },[navigate]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div className="div">
              <h1 className="title">Welcome to The Technical World</h1>
              <p className="subtitle">One of the best place for your Technical Up-Skilling</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="primary"
                >
                  Signup
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
