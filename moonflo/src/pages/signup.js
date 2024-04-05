import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig.js';
import './loginsignup.css'

const Signup = () => {
    const history = useNavigate();
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("User signed up successfully");
                history('/question1');
            })
            .catch(err => {
                console.error("Error signing up:", err);
                alert(err.code);
            });
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <div className="input-box">
                    <input name="email" placeholder="Email" required />
                </div>
                <div className="input-box">
                    <input name="password" type="password" placeholder='Password (must be at least 6 characters long)' required />
                </div>
                <div className="input-box">
                    <input name="confirmPassword" type="password" placeholder='Confirm Password' required />
                    {passwordError && <p className="error-message">{passwordError}</p>}
                </div>
                <div className='submit'>
                <button type="submit">Sign Up</button>
                </div>
                <div className="register-link">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Signup;
