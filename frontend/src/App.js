import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./Screens/Landing/LandingPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyNotes from "./Screens/MyNotes/MyNotes";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import CreateNote from "./Screens/createNote/createNote";
import SingleNote from "./Screens/SingleNote/SingleNote";
import { useState } from "react";
import ProfileScreen from "./Screens/profileScreen/ProfileScreen";
import FrontPage from "./Screens/FrontPage/FrontPage";
import InfoTech from "./Screens/MyNotes/InfoTech";
import Engineering from "./Screens/MyNotes/Engineering";
import HealthCare from "./Screens/MyNotes/HealthCare";
import Automotive from "./Screens/MyNotes/Automotive";
import Culinary from "./Screens/MyNotes/Culinary";
import ConstructTrade from "./Screens/MyNotes/ConstructTrade";

const App = ()=>  {
  const  [search, setSearch] = useState("");
//  console.log(search);
  // Header and Footer is common for all that is why it appearing on every page
  return(
    
  <BrowserRouter>
    <Header  setSearch={setSearch} />   {/* our header will play role to set the state   */}
    <main>
      <Routes>
      <Route path="/" Component={FrontPage} />
      <Route path="/mainpage" Component={LandingPage}/>
      <Route path="/login" Component={LoginScreen}/>
      <Route path="/profile" Component={ProfileScreen}/>
      <Route path="/register" Component={RegisterScreen}/>
      <Route path="/mynotes/createnote" Component={CreateNote}/>    {/* for this functionality in our app we have to install react-markdown dependency */}
      <Route path="/mynotes" Component={()=> <MyNotes search={search} /> }/>   {/* we passing search here to filter out the notes */}
      <Route path="/mynotes/informationtechnology" Component={() => <InfoTech search={search}/>} />
      <Route path="/mynotes/engineering" Component={()=> <Engineering search={search} />} />
      <Route path="/mynotes/healthcare" Component={()=> <HealthCare search={search} />} />
      <Route path="/mynotes/automotivetechnology" Component={()=> <Automotive search={search} />} />
      <Route path="/mynotes/culinaryarts" Component={()=> <Culinary search={search} />} />
      <Route path="/mynotes/constructiontrades" Component={()=> <ConstructTrade search={search}/>} />
      <Route path="/note/:id" Component={SingleNote} />
      </Routes>
    </main>
    <Footer/>
  </BrowserRouter>
)};

export default App;
