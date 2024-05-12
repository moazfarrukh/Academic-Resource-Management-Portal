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
import { useJwt } from "react-jwt";

function Resources() {

    const [submitResource, setSubmitResource] = useState({
        title:'',
        description:'',
        category:''
    })
    const [findResource, setFindResource] = useState('')
    const [uploadPageStatus, setUploadPageStatus] = useState(false)
    const {theme,setTheme} = useContext(ThemeContext);
    const token = localStorage.getItem("token")
    const { decodedToken, isExpired } = useJwt(token);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resources, setResources] = useState([])
    const [fileContent, setFileContent] = useState(null);

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

    const handleBookmarkSign = async (resourceID)=>{
        await axios.post('http://localhost:3001/resource/bookmarkResource',{
            userID:decodedToken.userId,
            resourceID:resourceID
        })
        alert('Bookmark added successfully!')
    }

    function fetchFile(resource) {
        if (resource) {
          axios.get(`http://localhost:3001/${resource.file_path}`, { responseType: 'blob' })
            .then((response) => {
              // Convert the blob to a base64 string
              const reader = new FileReader();
              reader.readAsDataURL(response.data);
              reader.onload = () => {
                setFileContent(reader.result);
                // After setting fileContent, initiate download with original file extension
                handleDownload(reader.result, resource.file_path);
              };
            })
            .catch((error) => {
              console.error('Error fetching file:', error);
            });
        }
      }
      
      const handleDownload = (fileContent, filePath) => {
        console.log("Downloading!");
        if (fileContent) {
          // Create Blob from base64 string
          const blob = new Blob([fileContent], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);
      
          // Create temporary anchor element to trigger download
          const a = document.createElement('a');
          a.href = url;
      
          // Determine filename and extension from file path
          const fileName = filePath.split('/').pop(); // Extract filename from file path
          const fileExtension = fileName.split('.').pop(); // Extract extension from filename
      
          a.download = fileName; // Use original filename
          document.body.appendChild(a);
          a.click();
      
          // Cleanup
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
      }
      
      const handleDownloadButton = (resource) => {
        console.log("fetching!");
        fetchFile(resource);
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
                        <div className="card" key={resource._id}>
                            <section className="resourceTexts">
                                <h1>{resource.title}<span onClick={()=>handleBookmarkSign(resource._id)} className="bookmarkSign"><FaStar /></span></h1>
                                <p>{resource.description.slice(0, 35)} ...</p>
                                <p><span style={{fontWeight:"bolder"}}>Category:</span> {resource.category}</p>
                            </section>
                            <NavLink to={`/resources/${resource._id}`} state={{resource : resource}}>
                                <button className="viewBtn">View</button>
                            </NavLink>
                            <button onClick={()=>handleDownloadButton(resource)} className={`downloadBtn-${theme}`}><FaDownload size={15}/></button>
                        </div>
                    )
                })}</div>
            </section>
        </>
     );
}

export default Resources;