import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./FirstPage.css";


const App = () => {
  const navigate = useNavigate(); // Initialize navigate
  const handleSignUpClick = () => {
    navigate("/signup"); // Redirect to the sign-in page
  };

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to the log-in page
  };
  return (
    <div className="intro">
      <h1>Welcome To <br /> MoonFlo</h1>
      <div className="button-container">
      <button className="left-button" onClick={handleLoginClick}>Login</button>
      <button className="right-button" onClick={handleSignUpClick}>Sign Up</button>
      
      </div>
      <div className="moon"></div>
    </div>
  );
};

export default App;