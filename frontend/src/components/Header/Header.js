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
import logo from "./A.png";

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
        <Navbar.Brand >
          <Link to="/" style={{display:"flex", border:"2px solid white", borderRadius:"8px"}}>
         <img src={logo} height={50} width={50} alt=""/>
          <h3> Aprender</h3>
          </Link>
        </Navbar.Brand>
        <Nav>
        <NavDropdown title="Technical Skill" id="basic-nav-dropdown">
           
           <NavDropdown.Item>
             <Link to="/contents/programming">Programming</Link>
           </NavDropdown.Item>
           <NavDropdown.Item>
             <Link to="/contents/cs fundamental">CS Fundamental</Link>
           </NavDropdown.Item>
           <NavDropdown.Item>
             <Link to="/contents/manager"></Link>
           </NavDropdown.Item>
         </NavDropdown>
          <Nav.Link >
            <Link to="/contents/effective communication">Effective Communication</Link>
          </Nav.Link>
          <Nav.Link >
            <Link to="/contents/motivational">Motivational</Link>
          </Nav.Link>
          <NavDropdown title="LeaderShip Quality" id="basic-nav-dropdown">
           
            <NavDropdown.Item>
              <Link to="/contents/business leader">business Leader</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/contents/group leader">Group Leader</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/contents/manager">Manager</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav  className="ml-auto">
            {" "}
            {userInfo ? (
               <Nav >
               <Nav.Link>
                 <Link to="/contents">All Contentes</Link>
               </Nav.Link>
             
              <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
                {" "}
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={logoutHandler}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              </Nav>
            ) : (
              <Nav >
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
