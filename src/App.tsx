import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/NavBar" element={<Navbar />} />
        <Route path="/Footer" element={<Footer />} /> {/* Redireciona para Login por padrão */}

      </Routes>
    </Router>
  );
}

export default App;
