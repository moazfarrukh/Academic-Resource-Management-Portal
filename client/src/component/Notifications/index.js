import React, { useState } from "react";
import userPic from "../../media/user.png";
import "./index.css"
import Navigation from "../navbar/Navigation";

function Notifications() {
  const [notifications, setNotifications] = useState(["N1", "N2", "N3", "N4"]);

  return (
    <>
    <Navigation/>
      <section style={{marginLeft:"16%"}}>
        <div className="notifications">
            <h5 className="notificationHeading">Notifications</h5>
            {notifications.map((notification) => (
            <div className="notificationCard">
            <img
                className="cardImage"
                src={userPic}
                style={{ width: "4rem" }}
                alt="userPic"
            />
            <div className="cardContent">
                <h5>Notification Title</h5>
                <p>
                malesuada fames ac turpis egestas integer eget aliquet nibh praesent
                </p>
            </div>
            </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default Notifications;
