import { NavLink } from "react-router-dom";
import Navigation from "../navbar/Navigation";
import { useJwt } from "react-jwt";
import './index.css'

const Home = ()=>{
    const token = localStorage.getItem("token")
    const { decodedToken, isExpired } = useJwt(token);
    console.log(decodedToken);
    return(<>
        <Navigation/>
        <section className="leaveSideNav homePage">
            <h1>Home page</h1>
        </section>
    </>)
}

export default Home;