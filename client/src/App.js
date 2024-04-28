import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import Home from "./component/Home/index"
import Resources from "./component/Resources";
import Notifications from "./component/Notifications";
import UserSettings from "./component/userSettings";
import Playlists from "./component/Playlists";
import FAQ from "./component/FAQ";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route  path="/auth/login" Component={Login} />
        <Route  path="/auth/register" Component={Register} />
        <Route exact path="/" Component={Home}/>
        <Route exact path="/resources" Component={Resources}/>
        <Route exact path="/notifications" Component={Notifications}/>
        <Route exact path="/playlists" Component={Playlists}/>
        <Route exact path="/FAQs" Component={FAQ}/>
        <Route exact path="/peertopeer" Component={UserSettings}/>
        <Route exact path="/user/settings" Component={UserSettings}/>

      </Routes>
    </Router>
  );
}

export default App;
