import { NavLink } from "react-router-dom";
import Navigation from "../navbar/Navigation";
import './index.css'

const Home = ()=>{
    return(<>
        <Navigation/>
        <section className="leaveSideNav homePage">
            <h1>Home page</h1>
        </section>
    </>)
}

export default Home;