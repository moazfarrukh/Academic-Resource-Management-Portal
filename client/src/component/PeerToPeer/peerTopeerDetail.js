import { useLocation } from "react-router-dom";
import Navigation from "../navbar/Navigation";
import { useContext, useState } from "react";
import ThemeContext from "../../contexts/themeContext";
import axios from "axios";
import { useJwt } from "react-jwt";

function PeerToPeerDetail() {
    const location = useLocation();
    const [topic, setTopic] = useState(location.state.topic);
    const { theme, setTheme } = useContext(ThemeContext);
    const [addComment, setAddComment] = useState('')
    const token = localStorage.getItem("token")
    const { decodedToken, isExpired } = useJwt(token);
    // Function to append theme to class names
    const appendThemeToClassNames = (classNames) => {
        return `${classNames}-${theme}`;
    };

    const handlePostComment = async ()=>{
        await axios.post('http://localhost:3001/ptp/addCommentToTopic', {
            id:topic._id,
            commentTitle:addComment,
            author:decodedToken.firstName
        })
        .then((res, req)=>{
            setTopic(res.data)
        })
    }
    return ( 
        <>
            <Navigation/>
            <section style={{marginLeft:"16%"}}>
                <h1 className="ptpDetailHeading">{topic.title}</h1>

                <div style={{marginLeft:"5%"}} className={appendThemeToClassNames("resourceComments")}>
                        <h1 >Comments:</h1>
                        <div className="comments">
                        {topic.comments.map(comment=>{
                            return(
                                <div key={comment._id}>
                                    <h1>{comment.authorName}</h1>
                                    <p>{comment.text}</p>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    <div className={appendThemeToClassNames("resourceAddComment")}>
                        <textarea value={addComment} onChange={(e)=>{setAddComment(e.target.value)}} placeholder="Add your comments here!" rows="4"></textarea><br></br>
                        <button onClick={handlePostComment} className={appendThemeToClassNames("addCommentBtn")}>Post Comment</button>
                    </div>
            </section>
        </>
     );
}

export default PeerToPeerDetail;