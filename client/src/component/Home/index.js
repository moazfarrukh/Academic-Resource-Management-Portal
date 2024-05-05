import { NavLink, useNavigate } from "react-router-dom";
import Navigation from "../navbar/Navigation";
import { useJwt } from "react-jwt";
import './index.css'
import { Redirect as isAuthenticate } from "../../utils/redirect";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../../contexts/themeContext";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

const Home = ()=>{
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const {decodedToken, isExpired } = useJwt(token);
    const [uploadedResources, setUploadedResources] = useState([])
    const [bookmarkResources, setBookmarkResources] = useState([])
    const isAuth = isAuthenticate()
    
    function getAllUserResources()
    {
        axios.post('http://localhost:3001/users/getUserResources', {
            id: "662e4dc55a2153165456e4d1" //decodedToken.userId
        })
        .then((res, req) => {
            setUploadedResources(res.data); // Update state here
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }


    function getAllUserBookmarks(id)
    {
        axios.post('http://localhost:3001/users/getAllBookmarks', {
            userID: id 
        })
        .then((res, req) => {
            console.log(res.data.bookmarks)
            setBookmarkResources(res.data.bookmarks); // Update state here
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }
    
    useEffect(()=>{
        setTimeout(() => {
            if(!isAuth)
            {
                navigate("/auth/login")
            }
          }, 1000);
        
        getAllUserResources()

    }, [navigate, isAuth])

    
    const { theme, setTheme } = useContext(ThemeContext);

    // Function to append theme to class names
    const appendThemeToClassNames = (classNames) => {
        return `${classNames}-${theme}`;
    };

    useEffect(() => {
        if(decodedToken)
        {
            console.log(decodedToken.userId)
            getAllUserBookmarks(decodedToken.userId)
        }
    }, [uploadedResources]);

    const handleBookmarkSign = ()=>{
        console.log("id")
    }

    return(<>
        <Navigation/>
        
        <section className={appendThemeToClassNames("leaveSideNav")}>
            <div className={appendThemeToClassNames("personalInfo")}>
            {decodedToken && (
                        <>
                            <p>Name: {`${decodedToken.firstName ? decodedToken.firstName.toUpperCase() : ''} ${decodedToken.lastName ? decodedToken.lastName.toUpperCase() : ''}`}</p>
                            <p>Email: {decodedToken.email}</p>
                        </>
                    )}
            </div>

            <div className={appendThemeToClassNames("userUploadedResources")}>
                <h1>Uploaded Resources:</h1>
                
                {<div className={`cards-${theme}`}>{uploadedResources.map(resource=>{
                    return(
                        <div className="card" key={resource._id}>
                            <section className="resourceTexts">
                                <h1>{resource.title}<span onClick={handleBookmarkSign} className="bookmarkSign"><FaStar /></span></h1>
                                <p>{resource.description.slice(0, 35)} ...</p>
                                <p><span style={{fontWeight:"bolder"}}>Category:</span> {resource.category}</p>
                            </section>
                            <NavLink to={`/resources/${resource._id}`} state={{resource : resource}}>
                                <button className="viewBtn">View</button>
                            </NavLink>
                            <button className={`downloadBtn-${theme}`}><FaDownload size={15}/></button>
                        </div>
                    )
                })}</div>}
            </div>

            <div className={appendThemeToClassNames("userResourceBookmarks")}>
                <h1>Bookmarks/Favourite Resources:</h1>
                {<div className={`cards-${theme}`}>{bookmarkResources.map(resource=>{
                    return(
                        <div className="card" key={resource._id}>
                            <section className="resourceTexts">
                                <h1>{resource.title}<span onClick={handleBookmarkSign} className="bookmarkSign"><FaStar /></span></h1>
                                <p>{resource.description.slice(0, 35)} ...</p>
                                <p><span style={{fontWeight:"bolder"}}>Category:</span> {resource.category}</p>
                            </section>
                            <NavLink to={`/resources/${resource._id}`} state={{resource : resource}}>
                                <button className="viewBtn">View</button>
                            </NavLink>
                            <button className={`downloadBtn-${theme}`}><FaDownload size={15}/></button>
                        </div>
                    )
                })}</div>}
            </div>
        </section>
    </>)
}

export default Home;