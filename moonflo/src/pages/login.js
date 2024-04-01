import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { database } from '../FirebaseConfig.js';
import './loginsignup.css'

const Login = () => {
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(database, email, password)
            .then(() => {
                console.log("User signed in successfully");
                history('/diary');
            })
            .catch(err => {
                console.error("Error signing in:", err);
                alert(err.code);
            });
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input name="email" placeholder="Email" required />
                </div>
                <div className="input-box">
                    <input name="password" type="password" placeholder='Password' required />
                </div>
                <div className='submit'>
                <button type="submit">Login</button>
                </div>
                <div className="register-link">
                    <p>Don't have an account? <Link to="/signup">Register</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Login;
