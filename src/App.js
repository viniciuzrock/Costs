import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Container from "./components/layout/Container/Container";
import Footer from "./components/layout/Footer/Footer";
import Navbar from "./components/layout/Navbar/Navbar";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home/Home";
import NewProject from "./components/pages/NewProject/NewProject";
import Project from "./components/pages/Project/Project";
import Projects from "./components/pages/Projects/Projects";

function App() {
  return (
      <Router>
        <Navbar/>
        <Container customClass="min-height">
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/company" element={<Company/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/newproject" element={<NewProject/>}/>
            <Route path="/project/:id" element={<Project/>}/>
          </Routes>
        </Container>
        <Footer/>
      </Router>
  );
}

export default App;
