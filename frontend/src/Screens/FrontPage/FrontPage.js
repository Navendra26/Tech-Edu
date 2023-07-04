import React from 'react';
import Title from './Title';
import "./FrontPage.css";
import FrontpageContent from './FrontpageContent';
import { Col, Row, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FrontPage = () => {
  return (
    <div className='background'
    >
      <Title/>
    <Row>
      <Col className='col-2 bg-success'>
      <h5 className='pt-3 text-center'>Our Content</h5>
        <hr className='py-0'/>
            <ul className='list-inline list'
             >
              <li>
                <Link to="/mynotes/informationtechnology">
                  Information Technology
                </Link>
              </li>
              <li>
                <Link to="/mynotes/engineering">Engineering</Link>
              </li>
              <li>
                <Link to="/mynotes/healthcare">HealthCare</Link>
              </li>
              <li>
                <Link to="/mynotes/automotivetechnology">Automotive Technology</Link>
              </li>
              <li>
                <Link to="/mynotes/culinaryarts">Culinary Arts</Link>
              </li>
              <li>
                <Link to="/mynotes/constructiontrades">Construction Trades</Link>
              </li>
              </ul>
      </Col>
      <Col>
    <div >
     <FrontpageContent/>
    
   </div>
   </Col>
   </Row>
 </div>
  );
}

export default FrontPage;