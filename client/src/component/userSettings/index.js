import { useContext, useEffect, useState } from "react";
import Navigation from "../navbar/Navigation";
import ThemeContext from "../../contexts/themeContext";
import { useJwt } from "react-jwt";
import "./index.css"
import axios from "axios";
function UserSettings() {
    const {theme,setTheme} = useContext(ThemeContext);
    var token = localStorage.getItem("token")
    const {decodedToken, isExpired } = useJwt(token);
    const [updateDivStatus, setUpdateDivStatus] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        newPassword: ""
    });

    const handleFormSubmit = async () => {
        try {
            const { firstName, lastName, newPassword } = formData;
            const updatedData = {};
            if (firstName) updatedData.firstName = firstName;
            if (lastName) updatedData.lastName = lastName;
            if (newPassword) updatedData.password = newPassword;

            await axios.patch("http://localhost:3001/users/updateUser", {
                userID:decodedToken.userId,
                data:formData
            })
            .then((res, req)=>{
                localStorage.setItem('token',res.data.token)
            })

            // Clear form data
            setFormData({
                firstName: "",
                lastName: "",
                newPassword: ""
            });

            // Toggle update div status
            setUpdateDivStatus(false);
            alert("Details updated!")
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const appendThemeToClassNames = (classNames) => {
        return `${classNames}-${theme}`;
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    useEffect(()=>{
        token = localStorage.getItem("token")
    }, [updateDivStatus])

    return ( 
        <>
            <Navigation/>
            <section style={{marginLeft:"16%"}}>
                <div className={appendThemeToClassNames("personalInfo")}>
                {decodedToken && (
                            <>
                                <p>Name: {`${decodedToken.firstName ? decodedToken.firstName.toUpperCase() : ''} ${decodedToken.lastname ? decodedToken.lastname.toUpperCase() : ''}`}</p>
                                <p>Email: {decodedToken.email}</p>
                            </>
                        )}
                </div>
                <button style={{marginLeft:"2rem"}} onClick={()=>setUpdateDivStatus(!updateDivStatus)}>{!updateDivStatus ? "Update My Data" : "Cancel"}</button>
                {updateDivStatus && <div className="getUserDataBlock">
                    <input type="text" name="firstName" placeholder="First name" onChange={handleInputChange} value={formData.firstName}/>
                    <input type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} value={formData.lastName}/>
                    <input type="password" name="newPassword" placeholder="New password" onChange={handleInputChange} value={formData.newPassword}/>
                    <center><button onClick={handleFormSubmit}>Update</button></center>
                </div>}
            </section>
        </>
     );
}

export default UserSettings;