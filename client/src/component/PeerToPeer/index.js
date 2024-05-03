import { useEffect, useState } from "react";
import Navigation from "../navbar/Navigation";
import './index.css'
import { NavLink } from "react-router-dom";
import axios from "axios";

function PeerToPeer() {

    const [addTopicStatus, setAddTopicStatus] = useState(false)
    const [topics, setTopics] = useState([])
    const [addNewComment, setAddNewComment] = useState()
    function getAllTopics(){
        axios.get('http://localhost:3001/ptp/getAllTopics')
        .then((res, req) => {
            console.log(res.data)
            setTopics(res.data)
        })
    }
    // axios.get('http://localhost:3001/ptp/getAllTopics')
    // .then((res, req)=>{
    //     console.log(res.data)
    //     setTopics(res.data)
    // })
    useEffect(() => {
        getAllTopics();
    }, []);


    const handleSubmitTopic = ()=>
    {
        axios.post('http://localhost:3001/ptp/addNewTopic',{
            title:addNewComment,
            comments : []
        })
        .then((res, req) => {
            getAllTopics();
        })

        setAddTopicStatus(false)
    }

    return ( 
        <>
            <Navigation/>
            <section style={{marginLeft:"16%"}}>
                    <div className="peertopeerHeading">
                        <h1 className="ptpMainHeading">Peer to Peer</h1>
                        <button onClick={()=>setAddTopicStatus(!addTopicStatus)}>{!addTopicStatus ? 'Add a topic' :'Cancel'}</button>
                    </div>

                    { addTopicStatus && <div className="addPtpTopic">
                        <input onChange={e=>setAddNewComment(e.target.value)} type="text" placeholder="Add a topic"/>
                        <button onClick={handleSubmitTopic}>Submit</button>
                    </div>}

                    <div className="ptopTopics">
                        {topics.map(topic=>{
                            return(
                                <div className="ptopTopic" key={topic._id}>
                                    <NavLink to={`/peertopeer/${topic._id}`} state={{topic : topic}}>
                                        <h1>{topic.title}</h1>
                                    </NavLink>
                                </div>
                            )
                        })}
                    </div>
            </section>
        </>
     );
}

export default PeerToPeer;