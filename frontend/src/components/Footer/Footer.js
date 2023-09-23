import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Footer.css';
const Footer = () => {
  return (
   <footer
     className='footer py-3'
     >
     <Container>
       <Row>
          <Col className='text-center text-white'>
          Copyright &copy; Technical Education
          <div className='socialIcons'> 
          <p className='contactus'>Contact On</p> {"   "}
          <span className='icon'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         fill="currentColor" stroke='currentColor' role="img" height="1em" width="1em">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          
      </svg>
           
            </span>
          <span className='icon'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         fill="currentColor" stroke='currentColor' role="img" height="1em" width="1em">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          
      </svg>
            </span>
          
          <span className='icon'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         fill="currentColor" stroke='currentColor' role="img" height="1em" width="1em">
          <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5v-15c0-.828.673-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z"/>
          
      </svg>
            </span>
           
          <span className='icon'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         fill="currentColor" stroke='currentColor' role="img" height="1em" width="1em">
          <path d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"/>
          
      </svg>
            </span>

            </div>
          </Col>
         
           <p className='py-3 text-white text-center'>Our Ed-Tech website is your compass in navigating the exciting, ever-changing realm of educational technology. Join us on this transformative journey as we explore how technology can enhance learning, inspire creativity, and shape the future of education. Together, let's unlock the full potential of Ed-Tech to revolutionize the way we teach and learn.
</p>
       </Row>
     </Container>
   </footer>
  );
}

export default Footer;