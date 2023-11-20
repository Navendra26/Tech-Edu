import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card, Form, FormControl, Nav } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Mainscreen from "../../components/Mainscreen";
// import axios from "axios";   it had been imported bcz we were fetching notes diretly from the server's api
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/Errormessage";

const Catagorialcontent = () => {
  const [search, setSearch] = useState("");
  const [admin, setAdmin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {category} = useParams();

  const noteList = useSelector((state) => state.noteList); //  useSelector() - To access our states from reducer, prenset in the redux store file
  const { loading, notes, error } = noteList; //destructuring variables of noteList state (it coming from redux state)

  const userLogin = useSelector((state) => state.userLogin); //using this state becoz we want to go on login screen page whenever user logout
  const { userInfo } = userLogin; // we need only userInfo variable from userLogin state

  const noteCreate = useSelector((state) => state.noteCreate); // this is used bcoz sometimes it not display when we create a new note  so it will help to display
  const { success: successCreate } = noteCreate; // using one varible success and rename it as seccessCreate

  const noteUpdate = useSelector((state) => state.noteUpdate); // this is used bcoz sometimes it not display when we create a new note  so it will help to display
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete); // this is used bcoz sometimes it not display when we create a new note  so it will help to display
  const {
    error: errorDelete,
  } = noteDelete;

  const contents = notes?.filter((content) => content.category.toLowerCase() === category);

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
    userInfo && setAdmin(userInfo.isAdmin);
    dispatch(listNotes()); // redirecting to listNotes() defined within notesAction.js
   /*  if (!userInfo ) {
      navigate("/");
    } */
    
  }, [dispatch, noteCreate, noteUpdate, noteDelete, navigate, userInfo]); // whenever any of this are changes the useEffect rerender the page

 console.log(category);

  return (
    <Mainscreen title= {category}>
      {admin &&
      <Link to={"/contents/createcontent"}>
        {/* here (/createnote will take us just after localhost:_port) slash will not be used bcoz we want path should be after AllContents/ */}
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Contents
        </Button>
      </Link>
      }
       <Nav className={admin ? "m-auto float-md-right":"m-auto float-md-center"}>
            <Form >
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setSearch(e.target.value)}
                inline="true"
              />
            </Form>
          </Nav>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
     
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {contents   // '?' over here is for optional chaining
        ?.reverse()       /* reverse() is used for rendring noteList from bottom to top */
        .filter((filteredNote) =>  /* filter() is used for - when we search any note it filter accordingly our note list */
          filteredNote.title.toLowerCase().includes(search.toLowerCase())   /* as we want to sameCase for comparision so we used toLowerCase() */
        )
        .map(
          (
            note // '?' sign is for optional if we have notes(here) then render and also render even if we dont have any data in notes
          ) => (
            
            <div key={note._id} >
              <div eventKey="0" >
                <div className="acc-items" style={{ margin: 10,}}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                        whiteSpace: "nowrap",
                        overflow:"hidden",
                      }}
                    >
                      <a href={`/content/${note._id}/${note.category}/${note.title}`}>
                      <div as={Card.Text} variant="link">
                       {note.title} 
                      </div>
                    </a>
                    </span>
                    {admin &&
                    <div>
                      <Button href={`/content/${note._id}`}>Edit</Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteNoteHandler(note._id)}
                      >
                        Delete
                      </Button>
                    </div>
                    }
                  </Card.Header>
                 
                </div>
              </div>
            </div>
            
          )
        )}
    </Mainscreen>
  );
}

export default Catagorialcontent;