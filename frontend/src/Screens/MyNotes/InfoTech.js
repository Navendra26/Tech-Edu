import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listNotes } from "../../actions/notesAction";
import Cards from "../../components/Card";

const InfoTech = ({ search }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList); //  useSelector() - To access our states from reducer, prenset in the redux store file
  const { notes } = noteList; //destructuring variables of noteList state (it coming from redux state)
   
  const userLogin = useSelector((state) => state.userLogin); //using this state becoz we want to go on login screen page whenever user logout
  const { userInfo } = userLogin; // we need only userInfo variable from userLogin state

  const noteCreate = useSelector((state) => state.noteCreate); // this is used bcoz sometimes it not display when we create a new note  so it will help to display

  const noteUpdate = useSelector((state) => state.noteUpdate); // this is used bcoz sometimes it not display when we create a new note  so it will help to display

  const noteDelete = useSelector((state) => state.noteDelete); // this is used bcoz sometimes it not display when we create a new note  so it will help to display
  
  const itNotes = notes?.filter((note) => note.category === "Information Technology");

  useEffect(() => {
  
    dispatch(listNotes()); // redirecting to listNotes() defined within notesAction.js
    
  }, [dispatch, noteCreate, noteUpdate, noteDelete, navigate, userInfo]);
 return(
  <Cards title= "Welcome to Information Technology" search={search}  notes = {itNotes}/>
 );
}

export default InfoTech;