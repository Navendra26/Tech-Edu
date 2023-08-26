import React, { useEffect, useState } from "react";
import "./FrontPage.css";
import {} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "./images/logo-edtech.png";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/Errormessage";
import { list10sortedNotes } from "../../actions/notesAction";
import { Result } from "./SlideShow";

/* https://source.unsplash.com/1200x400/?coding,javascript */
const FrontPage = () => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  const [arrow, setArrow] = useState("fa-solid fa-chevron-left");
  const noteList = useSelector((state) => state.noteList); //  useSelector() - To access our states from reducer, prenset in the redux store file
  const { notes } = noteList;
  let cates = new Set();
  notes?.forEach((note) => {
      cates.add(note.category);
  });
  const categ = [...cates];

  const sorted10List = useSelector((state) => state.noteListof10);
  const { loading, notes: topNotes, error } = sorted10List;

  useEffect(() => {
    dispatch(list10sortedNotes());
  }, [dispatch]);

  const toggleHadler = ()=>{
    clicked?
    setClicked(false): setClicked(true); 
    clicked? setArrow("fa-solid fa-chevron-left"):setArrow("fa-solid fa-chevron-right");
  }
  return (
    <>
      <marquee
        direction="right"
        scrollamount="5"
        bgcolor="green"
        className="marquee"
      >
        {" "}
        This is the best website for your up Skilling
      </marquee>
      <div>
        <section  className="frontend">
          <section style={{width: clicked ? "30px": ""}} className="sidenav">
          <i onClick={toggleHadler}
          className={arrow} style={{cursor:"pointer", float:"right", marginTop:"-10px", paddingRight:"5px"}}></i>
            <h5 className="pt-3 text-center" style={{textOrientation:clicked? "upright": "", writingMode: clicked? "vertical-lr":"", fontWeight: clicked?"600":""}}>Our Contents</h5>
            <hr className="py-0" />
            <div className="list">
              {categ.map((value) => (
                clicked ? "":
                <Link
                  to={`/contents/${value
                    .replace(/ /g, " ")
                    .toLowerCase()}`}
                >
                  {" "}
                  {/* replacing spaces between words in a string */}
                  {value}
                </Link> 
              )) }
              
            </div>
          </section>
          <section className="header">
            <header className="headers">
              <img src={logo} alt="logo" width={130} />
              <div className="title">
                <h1>Ed-TECH Plateform</h1>
              </div>
            </header>
            <div className="text-box">
              <h1>World's Biggest Plateform</h1>
              <p>
                Making websiteis now one of the easist thing in the world. You
                just need to learn HTML, CSS,
                <br />
                Javascript and you are good to go.
              </p>
              <a href="/aboutus " className="hero-btn">
                Visit Us to Know More
              </a>
            </div>
          </section>
          <section className="topNotes">
            <div>
              <h1>Most recent added contents</h1>
              <div>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading size={80} />}
                <Result notes={topNotes} />
              </div>
            </div>
          </section>
          <section className="skill">
            <h1>You Learn the Things</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In quae
            </p>

            <div className="row">
              <div className="skill-col">
                <h3>Top Skills</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Officia eos, amet quasi alias est ipsum quo optio mollitia
                  veniam iste fuga veritatis, natus quia praesentium, ea dolorem
                  vero harum quisquam.
                </p>
              </div>
              <div className="skill-col">
                <h3>Technical Skills</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Officia eos, amet quasi alias est ipsum quo optio mollitia
                  veniam iste fuga veritatis, natus quia praesentium, ea dolorem
                  vero harum quisquam.
                </p>
              </div>
              <div className="skill-col">
                <h3>Soft Skill</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Officia eos, amet quasi alias est ipsum quo optio mollitia
                  veniam iste fuga veritatis, natus quia praesentium, ea dolorem
                  vero harum quisquam.
                </p>
              </div>
            </div>
          </section>

          <section className="identy">
            <h1>Our Globle Reach</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

            <div className="row">
              <div className="identy-col">
                <img src="https://source.unsplash.com/400x400/?london" alt="" />
                <div className="layer">
                  <h3>LONDON</h3>
                </div>
              </div>
              <div className="identy-col">
                <img
                  src="https://source.unsplash.com/400x400/?newyorks"
                  alt=""
                />
                <div className="layer">
                  <h3>NEWYORK</h3>
                </div>
              </div>
              <div className="identy-col">
                <img src="https://source.unsplash.com/400x400/?india" alt="" />
                <div className="layer">
                  <h3>INDIA</h3>
                </div>
              </div>
            </div>
          </section>

          <section className="benefit">
            <h1>Benefits of this Website</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

            <div className="row">
              <div className="benefit-col">
                <img
                  src="https://source.unsplash.com/1200x400/?library"
                  alt=""
                />
                <h3>World's Top Content Creator</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quidem incidunt debitis consectetur maxime id quam saepe.
                </p>
              </div>
              <div className="benefit-col">
                <img
                  src="https://source.unsplash.com/1200x400/?basketball"
                  alt=""
                />
                <h3>100% Job guaranties</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quidem incidunt debitis consectetur maxime id quam saepe.
                </p>
              </div>
              <div className="benefit-col">
                <img
                  src="https://source.unsplash.com/1200x400/?cafeteria"
                  alt=""
                />
                <h3>Learn New Things</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quidem incidunt debitis consectetur maxime id quam saepe.
                </p>
              </div>
            </div>
          </section>

          {/* <!-----------Testimonials--------> */}
          <section className="testimonials">
            <h1>What Our Reader says</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            <div className="row">
              <div className="testimonials-col">
                <img src="https://source.unsplash.com/400x400/?user" alt="" />
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    culpa beatae exercitationem odio dignissimos, voluptas error
                    animi iure sunt consectetur ipsum vel? Repellat ea ducimus
                    illum odio nisi maxime beatae!
                  </p>
                  <h3>Chritine Chritine</h3>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-o"></i>
                </div>
              </div>
              <div className="testimonials-col">
                <img src="https://source.unsplash.com/400x400/?users" alt="" />
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    culpa beatae exercitationem odio dignissimos, voluptas error
                    animi iure sunt consectetur ipsum vel? Repellat ea ducimus
                    illum odio nisi maxime beatae!
                  </p>
                  <h3>Joseph Ghosh</h3>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-half-o"></i>
                </div>
              </div>
            </div>
          </section>

          {/* <!----------Call To Action--------> */}
          <section className="cta">
            <h1>
              Enroll For Our Various Tech Skills <br />
              Anywhere from The World
            </h1>
            <a href="/contact" className="hero-btn">
              CONTACT{" "}
            </a>
          </section>
        </section>
      </div>
    </>
  );
};

export default FrontPage;
