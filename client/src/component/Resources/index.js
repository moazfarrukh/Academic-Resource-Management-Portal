import { useContext, useEffect, useState } from "react";
import Navigation from "../navbar/Navigation";
import "./index.css"
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import ThemeContext from "../../contexts/themeContext";
import ResourceModal from "./uploadResourceModal";
import axios from "axios";

function Resources() {

    const [submitResource, setSubmitResource] = useState({
        title:'',
        description:'',
        category:''
    })
    const [findResource, setFindResource] = useState('')
    const [uploadPageStatus, setUploadPageStatus] = useState(false)
    const {theme,setTheme} = useContext(ThemeContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resources, setResources] = useState([])

    function getAllResources()
    {
        axios.get('http://localhost:3001/resource')
        .then((res, req)=>{
            setResources(res.data)
        })
    }

    useEffect(()=>{
        getAllResources()
    }, [])


    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    
      const handleSubmitResource = (formData) => {
        console.log(formData);
        handleCloseModal();
        getAllResources()
      };

    const filteredResources = resources.filter(resource => {
        const searchText = findResource.toLowerCase();
        return (
            resource.title.toLowerCase().includes(searchText) ||
            resource.description.toLowerCase().includes(searchText) ||
            resource.category.toLowerCase().includes(searchText)
        );
    });


    const handleBookmarkSign = ()=>{
        console.log("id")
    }
    return ( 
        <>
            <Navigation/>
            <section style={{marginLeft:"16%"}}>

                <div className={`resourceSearch-${theme}`}>
                    <input type="text" value={findResource} placeholder="Search for Resource" onChange={e=>setFindResource(e.target.value)}/>
                    <button onClick={handleOpenModal} className={`uploadResourceBtn-${theme}`} >Upload</button>
                </div>
    
                <ResourceModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} onSubmit={handleSubmitResource} />
                <div className={`cards-${theme}`}>{filteredResources.map(resource=>{
                    return(
                        <div className="card" key={resource.id}>
                            <section className="resourceTexts">
                                <h1>{resource.title}<span onClick={handleBookmarkSign} className="bookmarkSign"><FaStar /></span></h1>
                                <p>{resource.description.slice(0, 35)} ...</p>
                                <p><span style={{fontWeight:"bolder"}}>Category:</span> {resource.category}</p>
                            </section>
                            <NavLink to={`/resources/${resource.id}`} state={{resource : resource}}>
                                <button className="viewBtn">View</button>
                            </NavLink>
                            <button className={`downloadBtn-${theme}`}><FaDownload size={15}/></button>
                        </div>
                    )
                })}</div>
            </section>
        </>
     );
}

export default Resources;