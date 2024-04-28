import { NavLink, useLocation } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { GoContainer } from "react-icons/go";



function SideNav(){

    const location = useLocation();

    return(<>
        <section className="sideNavbar">
            <ul>
                <li className={location.pathname==='/'?'activeLink' : ''}>
                    <NavLink to="/" >
                        <p ><IoMdHome style={{paddingRight:"0.6rem"}}/>Home</p>
                    </NavLink>
                </li>
                <li className={location.pathname==='/resources'?'activeLink' : ''}>
                    <NavLink to="/resources">
                        <p ><GoContainer style={{paddingRight:"0.6rem"}} />Resources</p>
                    </NavLink>
                </li>

                <li className={location.pathname==='/playlists'?'activeLink' : ''}>
                    <NavLink to="/playlists">
                        <p><FaUserFriends style={{paddingRight:"0.6rem", marginTop:"auto"}} />Playlists</p>
                    </NavLink>
                </li>

                <li className={location.pathname==='/peertopeer'?'activeLink' : ''}>
                    <NavLink to="/peertopeer">
                        <p><FaUserFriends style={{paddingRight:"0.6rem", marginTop:"auto"}} />Peer-to-peer</p>
                    </NavLink>
                </li>

                <li className={location.pathname==='/notifications'?'activeLink' : ''}>
                    <NavLink to="/notifications">
                        <p><FaUserFriends style={{paddingRight:"0.6rem"}} />Notifications</p>
                    </NavLink>
                </li>
                

                <li className={location.pathname==='/user/settings'?'activeLink' : ''}>
                    <NavLink to="/user/settings">
                        <p><FaUserFriends style={{paddingRight:"0.6rem", marginTop:"auto"}} />Settings</p>
                    </NavLink>
                </li>

                <li className={location.pathname==='/FAQs'?'activeLink' : ''}>
                    <NavLink to="/FAQs">
                        <p><FaUserFriends style={{paddingRight:"0.6rem", marginTop:"auto"}} />FAQs</p>
                    </NavLink>
                </li>
                
            </ul>
        </section>
    </>)
}

export default SideNav;