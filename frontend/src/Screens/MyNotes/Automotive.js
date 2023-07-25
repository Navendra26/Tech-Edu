import { useSelector } from "react-redux";
import Cards from "../../components/Card";

const Automotive = ({ search }) => {
 
  const noteList = useSelector((state) => state.noteList); //  useSelector() - To access our states from reducer, prenset in the redux store file
  const { notes } = noteList; //destructuring variables of noteList state (it coming from redux state)
   
  const itNotes = notes?.filter((note) => note.category === "Automotive Technology");

 return(
  <Cards title= "Welcome to Automotive Technology" search={search}  notes = {itNotes}/>
 );
}

export default Automotive;