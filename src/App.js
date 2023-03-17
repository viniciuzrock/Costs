import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Container from "./layout/Container/Container";
import Navbar from "./layout/Navbar/Navbar";
import Company from "./pages/Company";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NewProject from "./pages/NewProject";


function App() {
  return (
      <Router>
        <div>
          <Link to="/"> home </Link>
          <Link to="/contatc"> contatc </Link>
          <Link to="/company"> company </Link>
          <Link to="/newproject"> newproject </Link>
        </div>
        <Container customClass="min-height">
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/contact" element={<Contact/>}/>
            <Route  path="/newproject" element={<NewProject/>}/>
            <Route  path="/company" element={<Company/>}/>
          </Routes>
        </Container>
        <p>footer</p>
      </Router>
  );
}

export default App;
