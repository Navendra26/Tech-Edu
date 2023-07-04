import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = ({ setSearch }) => {
  const navigate = useNavigate();

  // after adding redux
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin); // using for accessing the states from reducer stored in store (while logout is calling by dispatch func)
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    //after using redux
    dispatch(logout()); // directing to logout() defined in userAction.js
    navigate("/");
  };

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          {" "}
          {/*  we can use  either href or Link tag for routing. but Link would be preffered to use from react-router-dom  */}
          <Link to="/">Technical Education</Link>
        </Navbar.Brand>
        <Nav>
          <Nav.Link>
            <Link to="/action1.1">Technical Skill</Link>
          </Nav.Link>
          <Nav.Link >
            <Link to="/action1.2">Effective Communication</Link>
          </Nav.Link>
          <Nav.Link >
            <Link to="/action1.3">Motivational</Link>
          </Nav.Link>
          <NavDropdown title="LeaderShip Quality" id="basic-nav-dropdown">
            {" "}
            {/* we can make it optional chaining by '?' there */}
            <NavDropdown.Item>
              <Link to="/action2.0">bussiness Leader</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/action2.1">Group Leader</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/action2.3"></Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Form >
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setSearch(e.target.value)}
                inline="true"
              />
            </Form>
          </Nav>
          <Nav>
            {" "}
            {userInfo ? (
               <Nav>
               <Nav.Link>
                 <Link to="/mynotes">All Contentes</Link>
               </Nav.Link>
             
              <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
                {" "}
                {/* we can make it optional chaining by '?' there */}
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  /*  onClick={() => {  // before using redux
                localStorage.removeItem("userInfo");
                navigate("/");
              }} */
                  onClick={logoutHandler}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link>
                  <Link to="/mainpage">Login/signUp</Link>
                </Nav.Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
