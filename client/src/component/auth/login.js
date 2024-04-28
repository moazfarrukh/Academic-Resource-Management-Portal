import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.css'
import axios from 'axios';

function Login (){


    const [wrongAlert, setWrongAlert] = useState('');
    const wrongCredentialMsg = "Wrong email or password!";

    

    const [credentials, setCredentials] = useState({email :'', password:''})
    const navigate = useNavigate();

    const handleLogin = async ()=>{
        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                email: credentials.email,
                password: credentials.password
            });
            const data = response.data;
            if (data.token) {
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleRegister = ()=>{
        navigate("/auth/register");
    }

    return(
        <>
            <section className="loginPage">
                <div className="loginDiv">
                    <h1>Login</h1>
                    <p>Please enter your login and password</p><br></br>
                    <input type='text' value={credentials.email} placeholder='Email' onChange={(e)=>setCredentials({...credentials, email:e.target.value}) }/>
                    <input type='password' required value={credentials.password} placeholder='Password' onChange={(e)=>setCredentials({...credentials, password:e.target.value}) }/>
                    <p style={{padding:"0.7rem 0"}}>Forgot password?</p>
                    <div className='loginButtons'>
                        <button style={{borderColor:"#27ae60"}} className='loginButton' onClick={handleLogin}>Login</button>
                        <button className='RegisterButton' onClick={handleRegister}>Register</button>
                    </div>
                    <span className='wrongCredentialsText'>{wrongAlert}</span>
                </div>
            </section>
        </>
    )
}

export default Login;