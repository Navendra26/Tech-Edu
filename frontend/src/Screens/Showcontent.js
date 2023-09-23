import React, { useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Mainscreen from "../components/Mainscreen";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Showcontent = () => {
  const [title, setTitle] = useState();
  const [elements, setElements] = useState([]);
  const [category, setCategory] = useState();
  const [author, setAuthor] = useState();
  const [createdBy, setCreatedBy] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const navigate = useNavigate();
  const id = useParams().id;

  const gotoback = () => {
    navigate(-1);
  };
  console.log(id);
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${id}`);

      setTitle(data.title);
      setElements(data.elements);
      setCategory(data.category);
      setAuthor(data.author);
      setCreatedAt(data.createdAt);
      setCreatedBy(data.createdBy);
    };
    fetching();
  }, [id]);

  return (
    <Mainscreen title=" ">
      <Button variant="primary" onClick={() => gotoback()}>
        Back
      </Button>
      <div key={id}>
        <div eventKey="0">
          <div className="" style={{ margin: 10 }}>
            <Card.Header
              style={{
                display: "flex",
                background: "linear-gradient(to right, red,blue,green)",
              }}
            >
              <span
                style={{
                  color: "white",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <div className="text-center" as={Card.Text} variant="link">
                  {title}
                </div>
              </span>
            </Card.Header>
            <>
              <div>
                <h4>
                  <Badge className="p-2 my-2" bg="secondary">
                    Author - {author}
                  </Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <div>
                    {elements.map((ele, idx) => (
                      <div key={idx}>
                        {ele.type === "paragraph" && (
                          <div >
                            <ReactMarkdown>{ele.value}</ReactMarkdown>

                            <br />
                          </div>
                        )}{" "}
                        <br />
                        {ele.type === "image" && (
                          <div className="text-center">
                            {" "}
                            <div className="font-10px">
                              <i>
                                 {ele.caption}
                              </i>
                            </div>{" "}
                            <img src={ele.value} alt="image"></img>{" "}
                            <hr />{" "}
                          </div>
                        )}
                        {ele.type === "video" && (
                          <div style={{ margin: "3px" }}>
                            You Can also refer to{" "}
                            <span style={{ color: "green" }}>
                              {ele.caption}
                            </span>{" "}
                            below <br />{" "}
                            <iframe
                              width={600}
                              height={350}
                              src={`https://www.youtube.com/embed/${ele.value}`}
                              allowFullScreen
                            ></iframe>{" "}
                          </div>
                        )}
                      </div>
                    ))}
                    <hr></hr>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                      }}
                    >
                      <span style={{ cursor: "pointer", marginLeft: "160px" }}>
                        {" "}
                        <i className="fa fa-thumbs-up"></i>Like
                      </span>
                      <span style={{ cursor: "pointer", marginRight: "160px" }}>
                        {" "}
                        <i className="fa fa-thumbs-down"></i>Dislike
                      </span>
                    </div>
                  </div>

                  <footer className="blockquote-footer text-center">
                    Author: {author} <br />
                    Created on{" "}
                    <cite title="Source Title">
                      {createdAt.substring(0, 10)}
                      {"  by " + createdBy}
                    </cite>
                  </footer>
                </blockquote>
              </div>
            </>
          </div>
        </div>
      </div>
    </Mainscreen>
  );
};
export default Showcontent;
