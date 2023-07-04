import React from 'react';
import logo from './images/logo-edtech.png';
import './Title.css';

const Title = () => {
  return (
    <header 
    className='header'
    >
      <img src={logo} alt="logo" width={130} />
     <div className='title'>
      <h1>Ed-TECH Plateform for</h1>
      <h3>Soft Skill</h3>
      </div>
    </header>

  );
}

export default Title;