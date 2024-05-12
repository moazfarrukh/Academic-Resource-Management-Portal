import { useNavigate } from 'react-router-dom';
import './index.css';
import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [validationErrors, setValidationErrors] = useState([]);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/auth/login");
    }

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3001/auth/register', user);
            const data = response.data;

            if (data.errors) {
                // Set validation errors in state
                setValidationErrors(data.errors);
            } else if (data.token) {
                localStorage.setItem('token', data.token);
                navigate('/auth/login');
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.error("Error registering:", error);
        // Display an alert with the error message
            alert(`Error registering: ${ error.response.data.error }`);
        }
    }

    return (
        <section className="loginPage">
            <div className="loginDiv">
                <h1>Register</h1>
                <p>Please enter your login and password</p>
                <div className='nameInput'>
                    <input type='text' value={user.firstName} placeholder='First Name' onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                    <input className='lastName' value={user.lastName} type='text' placeholder='Last Name' onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                </div>
                <input type='text' value={user.email} placeholder='Email' onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <input type='password' placeholder='Password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                {/* Render validation errors */}
                {validationErrors.length > 0 &&
                    <div className="container">
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            {validationErrors.map((error, index) => (
                                <p key={index}>{error.msg}</p>
                            ))}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                }
                <div className='loginButtons' style={{ marginTop: "1rem" }}>
                    <button className='loginButton' onClick={handleLogin}>Login</button>
                    <button style={{ borderColor: "#27ae60" }} className='RegisterButton' onClick={handleRegister}>Register</button>
                </div>
            </div>
        </section>
    );
}

export default Register;
