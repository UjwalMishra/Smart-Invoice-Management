import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import AboutUs from "./pages/AboutUs";
import LandingPage from "./pages/LandingPage";
import Manviyapage from "./pages/Manviyapage"
import Ujwalpage from "./pages/Ujwalpage";
import Sahilpage from "./pages/Sahilpage"
import Sohampage from "./pages/Sohampage"
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
       <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/team/manviya" element={<Manviyapage />} />
              <Route path="/team/ujwal" element={<Ujwalpage />} />
              <Route path="/team/sahil" element={<Sahilpage />} />
              <Route path="/team/soham" element={<Sohampage />} />
    </Routes>
  );
}

export default App;
