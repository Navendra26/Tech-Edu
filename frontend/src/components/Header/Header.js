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


const Header = ({setSearch}) => {
    const navigate = useNavigate();
   
    // after adding redux 
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);  // using for accessing the states from reducer (while logout is calling by dispatch func)
    const {userInfo} = userLogin;

    const logoutHandler = () => {  //after using redux
        dispatch(logout());  // directing to logout() defined in userAction.js
        navigate("/");
    }
  
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">   {/*  we can use  either href or Link tag for routing. but Link would be preffered to use from react-router-dom  */}
          <Link to="/">Note Zipper</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e)=> setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          {userInfo ? <Nav>   {/* if any user logged in then link to /mynotes otherwise link to /login */}
            <Nav.Link href="/mynotes">
              <Link to="/mynotes">My Notes</Link>
            </Nav.Link>
            <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">   {/* we can make it optional chaining by '?' there */}
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item
              /*  onClick={() => {  // before using redux
                localStorage.removeItem("userInfo");
                navigate("/");
              }} */
              onClick={logoutHandler}
              >
                Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>:<Nav> 
          <Nav.Link>
              <Link to="/login">Login</Link>
            </Nav.Link>
            </Nav>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
