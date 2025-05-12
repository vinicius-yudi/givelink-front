import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Institutions from "./pages/Institutions"
import InstitutionRegister from "./pages/InstitutionRegister";
import Campaings from "./pages/Campaings";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Institutions" element={<Institutions />} />
        <Route path="/Campaigns" element={<Campaings />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/InstitutionRegister" element={<InstitutionRegister />} /> {/* Substitua pelo componente correto */}
        <Route path="/" element={<Home />} /> {/* Redireciona para Login por padrão */}

      </Routes>
    </Router>
  );
}

export default App;
