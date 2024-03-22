import React from 'react';
import { useNavigate } from "react-router-dom";
import './loginsignup.css'

const Login = ()=>{
    const navigate = useNavigate(); 
    const handleSignUpClick = () => {
        navigate("/signup"); // Redirect to the sign-in page
      };

    return (
        <div className='container'>
            <form action= " ">
                <h1> Login</h1>
                <div className="input-box">
                    <input type = "text" placeholder='Username' required/>
                </div>
                <div className="input-box">
                    <input type = "password" placeholder='Password' required/>
                </div>

                <div className = " remember-forgot">
                    <label><input type ="checkbox" />Remember me</label>
                    < a href = "#"> Forgot password?</a>
                </div>

                <button type = "submit"> Login</button>

                <div className="register-link">
                    <p>Don't have an account? <a onClick={handleSignUpClick} href = "#"> Register</a></p>
                </div>

            </form>
        </div>
    )
}

export default Login;
