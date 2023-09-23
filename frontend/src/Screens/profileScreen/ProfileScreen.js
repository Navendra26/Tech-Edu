import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import ErrorMessage from "../../components/Errormessage";
import Loading from "../../components/Loading";
import Mainscreen from "../../components/Mainscreen";
import './ProfileScreen.css';

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");


  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin); // since our form filled withe user Data (userInfo)
  const { userInfo } = userLogin;

  const userUpdate = useSelector(state => state.userUpdate);  // and after updating we need loading error and success
  const  { loading, error , success } = userUpdate;

  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo) {
      navigate("/");
    }
    else{
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  },[navigate,userInfo]);

  // cloudnary allow us to upload images (this is the logic to upload an image over here to the cloudinary)
 const postDetails = (pics) => {

  if(!pics){
    return setPicMessage("Please Select an Image");
  }
   setPicMessage(null);
   
   if(pics.type === 'image/jpeg' || pics.type === 'image/png'){  
    // this is generic code while uploading photos and files with cloudinary or with anything
    const data = new FormData();      // whenever we want to uplode new file we create new FormData <-- basic html
    data.append('file', pics);   // add a new field for pics
    data.append('upload_preset', 'notezipper');  // add upload_preset
    data.append('cloud_name', 'mysuperclouds');   // my clouds name in cloudinary(or anything)
    fetch("https://api.cloudinary.com/v1_1/mysuperclouds/image/upload", {
      method:"post",
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

 const submitHandler = (e) => {
  e.preventDefault();  //prevent the page from refreshing

  if(password === confirmPassword)
  // call our updateProfile function from the userAction
   dispatch(updateProfile({name, email, password, pic}));

 };

  return (
    <Mainscreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            {loading && <Loading/>}
            {success && (
              <ErrorMessage variant="success">
                Updated Successfully
              </ErrorMessage>
            )}
            {error && <ErrorMessage variant="danger"> {error} </ErrorMessage>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group> 
               {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )} 
               <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control
                type="file"
                id="custom-file"
                label="Upload Profile Picture"
                custom
                onChange={(e) => postDetails(e.target.files[0])}
                ></Form.Control>
              </Form.Group> 
              <Button type="submit" variant="primary">
                Update
              </Button> 
            </Form>
          </Col> 
          <Col 
            style={{
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
            }}
          >
            <img height={300} width={250} src={pic} alt={name} classname="profilePic" />
          </Col>
        </Row>
      </div>
    </Mainscreen>
  );
};

export default ProfileScreen;

// we have to create Route for this page
