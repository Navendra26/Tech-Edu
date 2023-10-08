import React, { useEffect, useState } from "react";
import "./FrontPage.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/Errormessage";
import { list10sortedNotes } from "../../actions/notesAction";
import { Result } from "./SlideShow";
import user1 from "./images/user1.jpg";
import user2 from "./images/user2.jpg";


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

  /* const toggleHadler = () => {
    clicked ? setClicked(false) : setClicked(true);
    clicked
      ? setArrow("fa-solid fa-chevron-left")
      : setArrow("fa-solid fa-chevron-right");
  }; */
  return (
    <>
      <marquee direction="left" scrollamount="5" className="marquee">
        {" "}
        This is the best website for your up Skilling
      </marquee>
      <div style={{overflow:"hidden"}}>
        <section className="frontend">
         {/*  <aside style={{ width: clicked ? "30px" : "" }} className="sidenav">
            <i
              onClick={toggleHadler}
              className={arrow}
              style={{
                cursor: "pointer",
                float: "right",
                marginTop: "-10px",
                paddingRight: "5px",
              }}
            ></i>
            <h5
              className="pt-3 text-center"
              style={{
                textOrientation: clicked ? "upright" : "",
                writingMode: clicked ? "vertical-lr" : "",
                fontWeight: clicked ? "600" : "bold",
              }}
            >
              Our Contents
            </h5>
            <hr className="py-0" />
            <div className="list">
              {categ.map((value) =>
                clicked ? (
                  ""
                ) : (
                  <Link
                    to={`/contents/${value.replace(/ /g, " ").toLowerCase()}`}
                  >
                    {" "}
                    
                    {value}
                  </Link>
                )
              )}
            </div>
          </aside> */}
          <section className="header">
            <header className="headers">
              <h1>Ed-TECH Plateform</h1>
            </header>
            <div className="text-box">
              <h1>World's Biggest Plateform</h1>
              <p>
                Welcome to our Ed-Tech website, a dynamic platform dedicated to
                the transformation of education through technology. In an era
                where digital innovation plays a pivotal role in shaping the way
                we learn and teach, our website serves as your indispensable
                guide to the world of educational technology.
                <br /> <br />
                Our website offers a comprehensive resource for educators,
                students, and parents alike, aiming to bridge the gap between
                traditional and modern learning methods. We delve into a myriad
                of topics, including online learning platforms, virtual
                classrooms, educational apps, and cutting-edge teaching tools.
                From the novice to the tech-savvy, we cater to all levels of
                digital literacy, providing insights and tutorials for seamless
                integration into educational settings.
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
                <h3>Tutorials and Guides</h3>
                <p>
                  Step-by-step tutorials and user-friendly guides to help you
                  harness the full potential of technology in education, whether
                  you're a teacher, student, or parent.
                </p>
              </div>
              <div className="skill-col">
                <h3>Case Studies</h3>
                <p>
                  Real-world examples of successful technology integration in
                  classrooms, showcasing the positive impact of ed-tech on
                  teaching and learning outcomes.
                </p>
              </div>
              <div className="skill-col">
                <h3>Latest Trends and Innovations</h3>
                <p>
                  Stay up-to-date with the latest trends, breakthroughs, and
                  innovations in the world of educational technology.
                </p>
              </div>
              <div className="skill-col">
                <h3>News and Updates</h3>
                <p>
                  Regularly updated news articles, blogs, and feature stories on
                  the evolving landscape of education and technology.
                </p>
              </div>
              <div className="skill-col">
                <h3>Community Hub</h3>
                <p>
                  Connect with a community of educators, students, and tech
                  enthusiasts to share experiences, ideas, and best practices.
                </p>
              </div>
              <div className="skill-col">
                <h3>In-Depth Reviews</h3>
                <p>
                  Unbiased reviews of popular ed-tech solutions, helping you
                  make informed decisions about the tools and platforms that
                  best suit your needs.
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
            <p>
              Educational technology (Ed-Tech) websites offer a wide range of
              benefits to students, educators, parents, and anyone interested in
              learning. Here are some key advantages of using Ed-Tech websites
            </p>

            <div className="row">
              <div className="benefit-col">
                <img
                  src="https://source.unsplash.com/1200x400/?analytics"
                  alt=""
                />
                <h3>Personalized Learning</h3>
                <p>
                  Many Ed-Tech platforms use data analytics and AI to tailor
                  content to individual learning needs. This adaptive learning
                  approach helps students progress at their own pace.
                </p>
              </div>
              <div className="benefit-col">
                <img
                  src="https://source.unsplash.com/1200x400/?multimedia"
                  alt=""
                />
                <h3>Interactive Learning</h3>
                <p>
                  Ed-Tech websites often incorporate multimedia elements,
                  simulations, quizzes, and interactive exercises that engage
                  learners and make learning more enjoyable and effective.
                </p>
              </div>
              <div className="benefit-col">
                <img src="https://source.unsplash.com/1200x400/?skill" alt="" />
                <h3>Skill Development</h3>
                <p>
                  Beyond traditional academic subjects, Ed-Tech platforms often
                  offer courses and resources for acquiring practical skills,
                  such as coding, digital marketing, or data analysis.
                </p>
              </div>
              <div className="benefit-col">
                <img
                  src="https://source.unsplash.com/1200x400/?income"
                  alt=""
                />
                <h3>Global Reach for Educators</h3>
                <p>
                  Ed-Tech allows educators to reach a global audience, creating
                  opportunities for sharing expertise and generating income
                  through online courses.
                </p>
              </div>
              <div className="benefit-col">
                <img
                  src="https://source.unsplash.com/1200x400/?e-books"
                  alt=""
                />
                <h3>Varied Learning Resources</h3>
                <p>
                  These websites offer a diverse range of learning materials,
                  including videos, e-books, podcasts, and interactive modules,
                  catering to different learning styles.
                </p>
              </div>
              <div className="benefit-col">
                <img src="https://source.unsplash.com/1200x400/?accessibility" alt="" />
                <h3>Accessibility</h3>
                <p>
                  Ed-Tech websites provide access to educational resources and
                  materials 24/7, breaking down geographical and time
                  constraints. Learners can access content at their convenience.
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
                <img src={user1} alt="" />
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
                <img src={user2} alt="" />
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
