import React from 'react';
import { useNavigate } from "react-router-dom";
import './loginsignup.css'

const Signup= ()=>{
    const navigate = useNavigate(); 

    const handleQ1Click = (event) => {
        event.preventDefault();
        navigate("/question1"); // Redirect to question1 page
      };

    return (
        <div className='container'>
            <form onSubmit={handleQ1Click}>
                <h1>Signup</h1>
                <div className="input-box">
                    <input type = "text" placeholder='Name' required/>
                </div>
                <div className="input-box">
                    <input type = "text" placeholder='Username' required/>
                </div>
                <div className="input-box">
                    <input type = "password" placeholder='Password' required/>
                </div>

                <button type="submit" >Signup</button>

            </form>
        </div>
    )
}

export default Signup;

