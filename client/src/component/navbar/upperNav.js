
import { NavLink, useNavigate  } from "react-router-dom";
import './index.css'
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect } from 'react';

function UpperNav()
{
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
    }




    return(
        <>
            <ul className='upperNav-ul'>
                <li className='mainLogo'>Academic Resource Portal</li>
                <li className='userDetail'>
                    <p>{ loginButton()}</p>
                    <FaRegUserCircle size={30}/>
                    <button onClick={handleLogout} style={{marginLeft:'1rem'}} className='loginButton'>Logout</button>
                </li>
                
            </ul>
        </>
    )
}

export default UpperNav;