import React from "react";
import NavBar from "../components/NavBar";
import './periodInfo.css';
import LearnMedi from "./learnMedi";

const medInfo = () =>{

    return(
    <div className="infoContainer">
       <LearnMedi/>
        <NavBar/>
    </div>
    );
};
export default medInfo;