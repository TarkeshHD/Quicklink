import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
  );
}

export default App;
