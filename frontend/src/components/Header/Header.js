import React from "react";
import {
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
        <Navbar.Brand>
         
          <Link to="/">TECH-ED</Link>
        </Navbar.Brand>
        <Nav>
          <Nav.Link>
            <Link to="/contents/technical skill">Technical Skill</Link>
          </Nav.Link>
          <Nav.Link >
            <Link to="/contents/effective communication">Effective Communication</Link>
          </Nav.Link>
          <Nav.Link >
            <Link to="/contents/motivational">Motivational</Link>
          </Nav.Link>
          <NavDropdown title="LeaderShip Quality" id="basic-nav-dropdown">
           
            <NavDropdown.Item>
              <Link to="/contents/leadership/bussiness leader">bussiness Leader</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/contents/leadership/group leader">Group Leader</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/contents/leadership/manager">Manager</Link>
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
                 <Link to="/contents">All Contentes</Link>
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
                  <Link to="/auth">Login/signUp</Link>
                </Nav.Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
