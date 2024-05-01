
import { NavLink, useNavigate  } from "react-router-dom";
import './index.css'
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect } from 'react';
import { Redirect as is } from "../../utils/redirect";
import { useJwt } from "react-jwt";

function UpperNav()
{
    const token = localStorage.getItem("token")
    const navigate = useNavigate();

    //const loginUser = store.getState().loginUser.user;
    const loginButton= ()=>{
        return(
            <NavLink to="/auth/login">
                    <button className='loginButton'>Login</button>
            </NavLink>
        )
    }

    const handleLogout= ()=>{
        localStorage.removeItem("token");
        navigate('/auth/login')
    }




    return(
        <>
            <ul className='upperNav-ul'>
                <li className='mainLogo'>Academic Resource Portal</li>
                <li className='userDetail'>
                    
                    <p>{ !token && loginButton()}</p>
                    <FaRegUserCircle size={30}/>
                    <button onClick={handleLogout} style={{marginLeft:'1rem'}} className='loginButton'>Logout</button>
                </li>
                
            </ul>
        </>
    )
}

export default UpperNav;