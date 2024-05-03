import { useState } from "react";
import Navigation from "../navbar/Navigation";
import './index.css'

function PeerToPeer() {

    const [addTopicStatus, setAddTopicStatus] = useState(false)
    const [topics, setTopics] = useState([
        'ajhfkajhgkjdgbkjabdgkjbankdgbn', 
        'adghnakjdghbakjldhgjahdglahnglj',
        'salkhgnjlkadhgbdgkjabdgksbakdgba',
        'adljghnakdjghbakjdbgkhjadbgkhabdkhgb'
    ])

    return ( 
        <>
            <Navigation/>
            <section style={{marginLeft:"16%"}}>
                    <div className="peertopeerHeading">
                        <h1>Peer to Peer</h1>
                        <button onClick={()=>setAddTopicStatus(!addTopicStatus)}>{!addTopicStatus ? 'Add a topic' :'Cancel'}</button>
                    </div>

                    { addTopicStatus && <div className="addPtpTopic">
                        <input type="text" placeholder="Add a topic"/>
                        <button>Submit</button>
                    </div>}

                    <div className="ptopTopics">
                        {topics.map(topic=>{
                            return(
                                <div className="ptopTopic">
                                    <h1>{topic}</h1>
                                </div>
                            )
                        })}
                    </div>
            </section>
        </>
     );
}

export default PeerToPeer;