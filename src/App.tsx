import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Institutions from "./pages/Institutions";
import InstitutionRegister from "./pages/InstitutionRegister";
import Campaings from "./pages/Campaings";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Donation from "./pages/Donation"

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      <Routes>
        <Route path="/donation" element={<Donation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/institutions" element={<Institutions />} />
        <Route path="/campaigns" element={<Campaings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/institutionregister" element={<InstitutionRegister />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
