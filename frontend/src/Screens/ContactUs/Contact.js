import axios from "axios";
import React, { useState } from "react";
import ErrorMessage from "../../components/Errormessage";

const Contact = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [ack, setAck] = useState(null);
  const [error, setError] = useState(null);

  const resetHandler = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");

  }

  const submitHandler = async (e) => {
      e.preventDefault()
       // calling to api
       try {
         const config = {
           //whenever we request an api it takes json data so we need to provide some headers
           headers: {
             "Content-type": "application/json",
            },
          };
          
          // fetching data by axios , calling api from server
          await axios.post(
            "/api/contact",
            {
              name,
              email,
              subject,
              message
            },
            config
            );
            setAck("your message has been sent!");
            setError(null);

        } catch (error) {
          setMessage(null);
          setError(error.response.data.message);
        }
     resetHandler();
    } 
  
  
  return (
    <div>
      <section class="sub-header">
        <h1>Contact Us </h1>
      </section>

      <section class="location">
        <iframe title="Location map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14788.852765713684!2d82.13216041363457!3d22.079673751153397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280b117b9ab6a7%3A0xc6f3f89d9eac7caf!2sBilaspur%2C%20Chhattisgarh%20495001!5e0!3m2!1sen!2sin!4v1656608661292!5m2!1sen!2sin"
          width="600"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <section class="contact-us">
        <div class="row">
          <div class="contact-col">
            <div>
              <i class="fa fa-home"></i>
              <span>
                <h5>XyZ Road, abc Building</h5>
                <p> Bilaspur, Chhattisgarh, India </p>
              </span>
            </div>
            <div>
              <i class="fa fa-phone"></i>
              <span>
                <h5>+91 6260936669, 8719081738</h5>
                <p> Monday to Saturday, 10am to 5pm </p>
              </span>
            </div>
            <div>
              <i class="fa fa-envelope-o"></i>
              <span>
                <h5>nbkbanjare1006@gmail.com</h5>
                <p> Email us for any Query </p>
              </span>
            </div>
          </div>

          <div class="contact-col">
            {error && <ErrorMessage variant="danger"> {error}</ErrorMessage>}
          {ack && <ErrorMessage variant="success">{ack}</ErrorMessage>}
            <form action={submitHandler} method="post">
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Enter your Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter Email address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                name="subject"
                value={subject}
                placeholder="Enter your subject"
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <textarea
                rows="8"
                name="message"
                value={message}
                placeholder="Message"
                onChange={(e)=> setMessage(e.target.value)}
              ></textarea>
              <button type="submit" class="hero-btn red-btn" onClick={submitHandler}>
                {" "}
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
