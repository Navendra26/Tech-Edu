import React from 'react';  
import about from '../FrontPage/images/about.jpg';  

const About = () => {
  return (
    <div> <section class="about">
    <h1>About Us </h1>
  </section>

  <section class="about-us">

    <div class="row">
      <div class="about-col">
        <h1>We are the world's best Ed Tech center </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis magni repellendus quibusdam! Deserunt sint quae quis, repellat enim molestias eum facere cum totam. Quos aliquam quaerat minus beatae commodi temporibus.</p>
        <a href="/" class="hero-btn red-btn">EXPLOR NOW</a>
      </div>
      <div class="about-col">
        <img src={about} alt=""/>
      </div>
    </div>
  </section>
  </div>
  )
}

export default About;