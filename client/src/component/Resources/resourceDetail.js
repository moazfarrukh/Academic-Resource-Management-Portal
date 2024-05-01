import { useLocation } from "react-router-dom";
import Navigation from "../navbar/Navigation";
import { FaStar } from "react-icons/fa";



function ResourceDetail() {
    const location = useLocation();
    const resource = location.state.resource
    return ( 
        <>
        <Navigation/>
            {console.log(resource)}
            <section  style={{marginLeft:"16%"}}>
                <div className="resourceDetails">
                    <h1>{resource.title}</h1>
                    <p>{resource.description}</p>
                    <p>Resource will show here...</p>
                </div>
                <hr className="resourceDetailLine"></hr>
                <div className="resourceFooter">
                    <div className="resourceRatting">
                        <h1>Rating: 4.4</h1>
                        <div className="ratingStars">
                        <FaStar size={25}/>
                        <FaStar size={25}/>
                        <FaStar size={25}/>
                        <FaStar size={25}/>
                        <FaStar size={25}/>
                        </div>
                    </div>
                    <div className="resourceComments">
                        <h1>Comments:</h1>
                    </div>
                    <div className="resourceAddComment">
                        <textarea placeholder="Add your comments here!" rows="4"></textarea><br></br>
                        <button className="addCommentBtn">Post Comment</button>
                    </div>
                </div>
            </section>
        </>
     );
}

export default ResourceDetail;