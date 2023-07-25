import { useSelector } from "react-redux";
import Cards from "../../components/Card";

const Culinary = ({ search }) => {
 
  const noteList = useSelector((state) => state.noteList); //  useSelector() - To access our states from reducer, prenset in the redux store file
  const { notes } = noteList; //destructuring variables of noteList state (it coming from redux state)
   
  const itNotes = notes?.filter((note) => note.category === "Culinary Arts");

 return(
  <Cards title= "Welcome to Culinary Arts" search={search}  notes = {itNotes}/>
 );
}

export default Culinary;