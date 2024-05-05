import { useContext, useEffect, useState } from "react";
import Navigation from "../navbar/Navigation";
import "./index.css";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios"; // Import axios for API requests
import ThemeContext from "../../contexts/themeContext";

function PlaylistDetail() {
    const location = useLocation();
    const playlist = location.state.playlist;
    const [findResource, setFindResource] = useState('');
    const { theme, setTheme } = useContext(ThemeContext);
    const [resources, setResources] = useState([]);

    useEffect(() => {
        // Fetch resources by their IDs
        console.log(playlist.resources)
        const fetchResources = async () => {
            try {
                const resourcesData = await Promise.all(playlist.resources.map(async (resourceId) => {
                    const response = await axios.get(`http://localhost:3001/resource/${resourceId}`);
                    return response.data;
                }));
                setResources(resourcesData);
            } catch (error) {
                console.error("Error fetching resources:", error);
            }
        };

        fetchResources();
    }, [playlist]);

    const filteredResources = resources.filter(resource => {
        const searchText = findResource.toLowerCase();
        return (
            resource.title.toLowerCase().includes(searchText) ||
            resource.description.toLowerCase().includes(searchText) ||
            resource.category.toLowerCase().includes(searchText)
        );
    });

    return ( 
        <>
            <Navigation/>

            <section style={{marginLeft:"16%"}}>
                <h1 className={`title-${theme}`}>{playlist.title}</h1>

                <div className={`cards-${theme}`}>
                    {filteredResources.map(resource=>{
                        return(
                            <div className="card" key={resource._id}>
                                <section className={`resourceTexts-${theme}`}>
                                    <h1>{resource.title}</h1>
                                    <p>{resource.description.slice(0, 35)} ...</p>
                                    <p><span style={{fontWeight:"bolder"}}>Category:</span> {resource.category}</p>
                                </section>
                                <NavLink to={`/resources/${resource._id}`} state={{resource : resource}}>
                                    <button className="viewBtn">View</button>
                                </NavLink>
                                <button className={`downloadBtn-${theme}`}><FaDownload size={15}/></button>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    );
}

export default PlaylistDetail;
