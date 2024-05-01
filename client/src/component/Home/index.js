import { NavLink, useNavigate } from "react-router-dom";
import Navigation from "../navbar/Navigation";
import { useJwt } from "react-jwt";
import './index.css'
import { Redirect as isAuthenticate } from "../../utils/redirect";
import { useEffect } from "react";

const Home = ()=>{
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const { decodedToken, isExpired } = useJwt(token);
    const isAuth = isAuthenticate()
    useEffect(()=>{
        setTimeout(() => {
            if(!isAuth)
            {
                navigate("/auth/login")
            }
          }, 1000);
    }, [navigate, isAuth])
    
    

    return(<>
        <Navigation/>
        <section className="leaveSideNav">
            <div className="personalInfo">
            {decodedToken && (
                        <>
                            <p>Name: {`${decodedToken.firstName ? decodedToken.firstName.toUpperCase() : ''} ${decodedToken.lastName ? decodedToken.lastName.toUpperCase() : ''}`}</p>
                            <p>Email: {decodedToken.email}</p>
                        </>
                    )}
            </div>

            <div className="userUploadedResources">
                <h1>Uploaded Resources:</h1>
            </div>
        </section>
    </>)
}

export default Home;