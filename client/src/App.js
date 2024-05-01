import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import Home from "./component/Home/index";
import Resources from "./component/Resources";
import Notifications from "./component/Notifications";
import UserSettings from "./component/userSettings";
import Playlists from "./component/Playlists";
import FAQ from "./component/FAQ";
import ResourceDetail from "./component/Resources/resourceDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/resources" element={<Resources />} />
        <Route exact path="/resources/:id" element={<ResourceDetail />} />
        <Route exact path="/notifications" element={<Notifications />} />
        <Route exact path="/playlists" element={<Playlists />} />
        <Route exact path="/FAQs" element={<FAQ />} />
        <Route exact path="/peertopeer" element={<UserSettings />} />
        <Route exact path="/user/settings" element={<UserSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
