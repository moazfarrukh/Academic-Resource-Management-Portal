import { useState } from "react";
import Navigation from "../navbar/Navigation";
import "./index.css"
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { NavLink } from "react-router-dom";


function Resources() {

    const [resources, setResources] = useState([
        {
            id:1,
            title:'Numerical Computing',
            description:'Past paper of numerical computing',
            media:'files',
            category:'past paper'
        },
        {
            id:2,
            title:'Numerical Computing',
            description:'Past paper of numerical computing',
            media:'files',
            category:'past paper'
        },
        {
            id:3,
            title:'Numerical Computing',
            description:'Past paper of numerical computing',
            media:'files',
            category:'past paper'
        },
        {
            id:4,
            title:'Numerical Computing 2021',
            description:'Past paper of numerical computing',
            media:'files',
            category:'past paper'
        },
        {
            id:5,
            title:'Numerical Computing',
            description:'Past paper of numerical computing',
            media:'files',
            category:'past paper'
        },
        {
            id:6,
            title:'Numerical Computing',
            description:'Past paper of numerical computing',
            media:'files',
            category:'past paper'
        },
        {
            id:7,
            title:'Numerical Computing',
            description:'Past paper of numerical computing Past paper of numerical computing Past paper of numerical computing',
            media:'files',
            category:'past paper'
        },
        {
            id:8,
            title:'Numerical Computing',
            description:'Past paper of numerical computing',
            media:'files',
            category:'past paper'
        }
    ])

    return ( 
        <>
            <Navigation/>
            <section style={{marginLeft:"16%"}}>

                <div className="cards">{resources.map(resource=>{
                    return(
                        <div key={resource.id}>
                            <h1>{resource.title}</h1>
                            <p>{resource.description.slice(0, 60)} ...</p>
                            <NavLink to={`/resources/${resource.id}`} state={{resource : resource}}>
                                <button className="viewBtn">View</button>
                            </NavLink>
                            <button className="downloadBtn"><FaDownload size={15}/></button>
                        </div>
                    )
                })}</div>
            </section>
        </>
     );
}

export default Resources;