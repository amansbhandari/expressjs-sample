import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import UserProfile from "./components/UserProfile";
import ProfileListing from "./components/ProfileListing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/profilelist" element={<ProfileListing />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
