import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Mainscreen from "../../components/Mainscreen";
// import axios from "axios";   it had been imported bcz we were fetching notes diretly from the server's api
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/Errormessage";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList); //  useSelector() - To access our states from reducer
  const { loading, notes, error } = noteList; //destructuring variables of noteList state (it coming from redux state)

  const userLogin = useSelector((state) => state.userLogin); //using this state becoz we want to go on login screen page whenever user logout
  const { userInfo } = userLogin; // we need only userInfo variable from userLogin state

  const noteCreate = useSelector((state) => state.noteCreate); // this is used bcoz sometimes it not display when we create a new note  so it will help to display
  const { success: successCreate } = noteCreate; // using one varible success and rename it as seccessCreate

  const noteUpdate = useSelector((state) => state.noteUpdate); // this is used bcoz sometimes it not display when we create a new note  so it will help to display
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete); // this is used bcoz sometimes it not display when we create a new note  so it will help to display
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteNoteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };
  /* 
   const [note, setNote] = useState([]);   //this was written bcz we were fetching notes directly from the api 
                                              //(now we gonna getting notes from our database by using Redux) 

 
         // for fetching dara from api(s) we need to install axios.
        // OR we can also fetch api by using fetch keyword instead of installing axios.

 // connecting backend to the frontend by using fetch or axios(here)
 const fetchNotes = async () => {
   const {data }= await axios.get("/api/notes");  //path will be this becoz our every request will go port 5000 thru port 3000

   setNotes(data);
 } */

  useEffect(() => {
    // fetchNotes();

    dispatch(listNotes()); // redirecting to listNotes() defined within notesAction.js
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, noteCreate, noteUpdate, noteDelete, navigate, userInfo]); // whenever any of this are changes the useEffect rerender the page

  return (
    <Mainscreen title={`Welcome Back ${userInfo.name}..`}>
      <Link to="createnote">
        {/* here (/createnote will take us just after localhost:_port) slash will not be used bcoz we want path should be after mynotes/ */}
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes   // '?' over here is for optional chaining
        ?.reverse()       /* reverse() is used for rendring noteList from bottom to top */
        .filter((filteredNote) =>  /* filter() is used for - when we search any note it filter accordingly our note list */
          filteredNote.title.toLowerCase().includes(search.toLowerCase())   /* as we want to sameCase for comparision so we used toLowerCase() */
        )
        .map(
          (
            note // we putted '?' here bcz we taking notes from database  (if take it from api of any files we dont need of ? there)
          ) => (
            <Accordion key={note._id}>
              <Accordion.Item eventKey="0">
                <Card style={{ margin: 10 }}>
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
                      <Button href={`/note/${note._id}`}>Edit</Button>
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
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">
                          Created on{" "}
                          <cite title="Source Title">
                            {note.createdAt.substring(0, 10)}
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

export default MyNotes;
