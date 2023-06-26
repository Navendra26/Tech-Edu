import React from 'react';
import './Mainscreen.css';
import { Container, Row } from 'react-bootstrap';

const Mainscreen = ({title, children}) => {
  return (
    <div className='mainback'>
       <Container>
         <Row>
           <div className="page">{
             title &&( <>     {/* condition - if there is title then it should go */}
             <h1 className="heading">{title}</h1>
             <hr/>
             </>
           )}
            {children}
           </div>
         </Row>
       </Container>
    </div>
  )
}

export default Mainscreen;