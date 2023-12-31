import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
import ErrorMessage from "../../components/Errormessage";
import Loading from "../../components/Loading";
import Mainscreen from "../../components/Mainscreen";
import "./RegisterScreen.css";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [secretKey, setSecretKey] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isAdmin) {
      try {
        const response = await fetch('/api/checkAdminSecret', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ adminSecret : secretKey }),
        });
  
        if (response.status === 200) {
          // Admin secret is valid, proceed with admin registration
          e.preventDefault();
          
          if (password !== confirmpassword) {
              setMessage("Passwords Do not Match");
          }
          
          else {
              dispatch(register(name, email, password, isAdmin, pic));
              setMessage("Successfully Registered")
          }
        } else {
          // Admin secret is invalid, show an error message
          setMessage("Invalid Admin");
        }
      } catch (error) {
          e.preventDefault();
        // Handle any network or server errors here
        setMessage("An error occurred. Please try again.");
      }
    } else {
      // Proceed with user registration
      dispatch(register(name, email, password, isAdmin, pic));
      setMessage("Successfully Registered");
    }
  };

  // cloudnary allow us to upload images (this is the logic to upload an image over here to the cloudinary)
  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      // this is generic code while uploading photos and files with cloudinary or with anything
      const data = new FormData(); // whenever we want to uplode new file we create new FormData <-- basic html
      data.append("file", pics); // add a new field for pics
      data.append("upload_preset", "notezipper"); // add upload_preset
      data.append("cloud_name", "mysuperclouds"); // my clouds name in mysuperclouds(or anything)
      fetch("https://api.cloudinary.com/v1_1/mysuperclouds/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  return (
    <Mainscreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="success">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <div>
            Register As{" "}
            <input
              type="radio"
              name="isAdmin"
              onClick={( ) => setIsAdmin(false)}
            />
            User
            <input
              type="radio"
              name="isAdmin"
              onClick={() => setIsAdmin(true)}
            />
            Admin
          </div>
          {isAdmin ? (
            <Form.Group controlId="secret key">
              <Form.Label>Secret key</Form.Label>
              <Form.Control
                type="secretKey"
                placeholder="Enter secret key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </Form.Group>
          ) : null}

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

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

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              onChange={(e) => postDetails(e.target.files[0])} // files[0] means if selected more than one image only first img will going to select
              id="custom-file"
              type="file"
              label="Upload Profile Picture"
              custom="true"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="">
          <Col>
            Have an Account ? <Link style={{color:"blue"}} to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </Mainscreen>
  );
};

export default RegisterScreen;
