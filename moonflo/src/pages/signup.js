import React from 'react';
import './loginsignup.css'

const Signup= ()=>{
    return (
        <div className='container'>
            <form action= " ">
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

                <button type = "submit"> Sign Up</button>

            </form>
        </div>
    )
}

export default Signup;
