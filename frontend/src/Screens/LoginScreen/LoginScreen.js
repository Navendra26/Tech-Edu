import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/Mainscreen";
import "./LoginScreen.css";
// import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/Errormessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";


const LoginScreen = () => {

  const navigate = useNavigate();   // navigate 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // after using redux
  const dispatch = useDispatch(); // we gonna use to call our user Actions

  const userLogin = useSelector(state => state.userLogin); //  useSelector() - To access our states from reducer
  const {loading, error, userInfo} = userLogin; // destructurin of variable of userLogin

   useEffect(() => {
     const userInfo = localStorage.getItem("userInfo");

     if(userInfo){
       navigate(-1);
     }
   },[navigate,userInfo]);

  const submitHandler = async (e) => {
    // since we are using await so function should be async
    e.preventDefault();

    dispatch(login(email,password))  // accessing via calling or redirecting to the login() defined in userAction.js
  
    /* try {              // code before using redux and now this block of code is written within userAction.js file
      const config = {
        //whenever we request an api it takes json data so we need to provide some headers
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true); //before requesting data it should be true for loading of server

      const { data } = await axios.post(
        // fetching data by axios
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      // after successfully login store data in our localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    } */
    
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link style={{color:"blue"}} to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;
