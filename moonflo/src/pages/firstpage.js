import React from "react";
import "../App.css";
import "../FirstPage.css";


const firstpage = () => {
  return (
    <div className="intro">
      <h1>Welcome To <br /> MoonFlo</h1>
      <div class="button">
         <button class = "left-button"> Login</button>
         <button class = "right-button"> Signup</button>
      </div>
      <div className="moon"></div>
    </div>
  );
};


export default firstpage;