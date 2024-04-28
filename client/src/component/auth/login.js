import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.css'

function Login (){


    const [wrongAlert, setWrongAlert] = useState('');
    const wrongCredentialMsg = "Wrong email or password!";

    

    const [credentials, setCredentials] = useState({email :'', password:''})
    const navigate = useNavigate();

    const handleLogin = ()=>{
        // const users = store.getState().users;
        // console.log(users);

        // const obj = users.find((o,i)=>
        //     o.email === credentials.email && o.password === credentials.password
        // )

        // if(obj === undefined)
        // {
        //     setWrongAlert(wrongCredentialMsg);
        //     setCredentials({email:'', password:''})
        // }
        // else
        // {
        //     //console.log(credentials);
        //     dispatch({
        //         type : 'login/loginTrue',
        //         payload : {isLogin : true, user : obj}
        //     })
        //     navigate("/");
        // }
        console.log("Login")
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