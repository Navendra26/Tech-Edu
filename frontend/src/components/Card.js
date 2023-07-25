import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Mainscreen from "./Mainscreen";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../actions/notesAction";
import Loading from "./Loading";
import ErrorMessage from "./Errormessage";

const Cards = ({notes,search, title}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList); //  useSelector() - To access our states from reducer, prenset in the redux store file
  const { loading, error } = noteList; //destructuring variables of noteList state (it coming from redux state)

  const userLogin = useSelector((state) => state.userLogin); //using this state becoz we want to go on login screen page whenever user logout
  const { userInfo } = userLogin; // we need only userInfo variable from userLogin state

  const noteCreate = useSelector((state) => state.noteCreate); // this is used bcoz sometimes it not display when we create a new note  so it will help to display
  
  const noteUpdate = useSelector((state) => state.noteUpdate); // this is used bcoz sometimes it not display when we create a new note  so it will help to display
  
  const noteDelete = useSelector((state) => state.noteDelete); // this is used bcoz sometimes it not display when we create a new note  so it will help to display
  const {
    error: errorDelete
  } = noteDelete;

  const deleteNoteHandler = (id) => {
    if(userInfo){
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  }
  else {
    alert("For this action you need to login :(");
  }};

  useEffect(() => {
    // fetchNotes();

    dispatch(listNotes()); // redirecting to listNotes() defined within notesAction.js
   /*  if (!userInfo ) {
      navigate("/");
    } */
  }, [dispatch, noteCreate, noteUpdate, noteDelete, navigate, userInfo]); // whenever any of this are changes the useEffect rerender the page


  return (
    <Mainscreen title= {title}>
      <Link to={userInfo ? "/mynotes/createnote" : "/login"}>
        {/* here (/createnote will take us just after localhost:_port) slash will not be used bcoz we want path should be after Card/ */}
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Contents
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
     
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes   // '?' over here is for optional chaining
        ?.reverse()       /* reverse() is used for rendring noteList from bottom to top */
        .filter((filteredNote) =>  /* filter() is used for - when we search any note it filter accordingly our note list */
          filteredNote.title.toLowerCase().includes(search.toLowerCase())   /* as we want to sameCase for comparision so we used toLowerCase() */
        )
        .map(
          (
            note // '?' sign is for optional if we have notes(here) then render and also render even if we dont have any data in notes
          ) => (
            <Accordion key={note._id}>
              <Accordion.Item eventKey="0">
                <Card className="acc-items" style={{ margin: 10 }}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      <Accordion.Button as={Card.Text} variant="link">
                        {note.title}
                      </Accordion.Button>
                    </span>
                    <div>
                      <Button href={userInfo ? `/note/${note._id}` :  "/login"}>Edit</Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteNoteHandler(note._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <h4>
                        <Badge bg="success">Catagory - {note.category}</Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                      <div>
                        
                        {note.pictures.map((foto) => (
                          <img  style={{
                            float:"right",
                            clear:"left",
                            marginLeft:"10px",
                           marginBottom: "5px",
                           border: "2px solid black",
                           padding: "2px",
                           borderRadius: "12px",
                           }} width={300} height={300} src={foto} />
                           ))}
                           <p>{note.content}</p>
                        </div>
                      { (note.ytVideos.length === 0) ? null: ( <div style={{
                          boxShadow:"1px 1px 2px 1px gray ",
                          padding: "5px",
                          display: "inline-block",
                        }}>
                          <p>{note.videoCaption}:
                          <a 
                          style={{
                            color: "blue",
                            textDecoration: "underline",
                          }} href={note.ytVideos}>redirect to the link</a>
                          </p>
                        </div>) }
                        <footer className="blockquote-footer">
                        Author: {note.author}  <br/>
                          Created on{" "}
                          <cite title="Source Title">
                            {note.createdAt.substring(0, 10)}
                            {"  by "+ note.createdBy}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion.Item>
            </Accordion>
          )
        )}
    </Mainscreen>
  );
};

export default Cards;