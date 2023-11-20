import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./Screens/Landing/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllContents from "./Screens/MyNotes/AllContents";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import CreateNote from "./Screens/createContents/createContent";
import SingleNote from "./Screens/SingleNote/SingleNote";
import { useEffect, useState } from "react";
import ProfileScreen from "./Screens/profileScreen/ProfileScreen";
import FrontPage from "./Screens/FrontPage/FrontPage";
import Showcontent from "./Screens/Showcontent";
import Catagorialcontent from "./Screens/MyNotes/Catagorialcontent";
import Contact from "./Screens/ContactUs/Contact";
import About from "./Screens/AboutPage/About";
import Dashboard from "./components/Dashboard/Dashboard";
import { useSelector } from "react-redux";

const App = () => {
  const [search, setSearch] = useState("");
  const [admin, setAdmin] = useState(false);
  const userLogin = useSelector((state) => state.userLogin); //using this state becoz we want to go on login screen page whenever user logout
  const { userInfo } = userLogin;
    
  useEffect(()=>{
    userInfo && setAdmin(userInfo.isAdmin);
    
  },[userInfo]);
  //  console.log(search);
  // Header and Footer is common for all that is why it appearing on every page
  return (
    <>
    <BrowserRouter>
      
       <Header setSearch={setSearch} />
      <main>
        <Routes>
          
          {admin && <Route path="/admin" Component={Dashboard} />}
          { !admin && <Route path="admin" element={<h1 style={{color:"red"}}>PAGE NOT FOUND</h1>} />}
          <Route path="/" Component={FrontPage} />
          <Route path="auth" Component={LandingPage} />
          <Route path="login" Component={LoginScreen} />
          <Route path="profile" Component={ProfileScreen} />
          <Route path="register" Component={RegisterScreen} />
          {/* for this functionality in our app we have to install react-markdown dependency */}
          <Route path="contents/createcontent" Component={CreateNote} />{" "}
          {/* we passing search here to filter out the contents */}
          <Route
            path="contents"
            Component={() => <AllContents search={search} />}
            
          />{" "}
          <Route
            path="contents/:category"
            Component={() => <Catagorialcontent search={search} />}
          />
          <Route path="content/:id" Component={SingleNote} />
          <Route path="content/:id/:category/:title" Component={Showcontent} />
          <Route path="contact" Component={Contact} />
          <Route path="aboutus" Component={About} />
          
        </Routes>
      </main>
          <Footer />
    </BrowserRouter>
    
    </>
  );
};

export default App;
