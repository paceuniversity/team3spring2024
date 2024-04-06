import React from "react";
import NavBar from "../components/NavBar";
import CycleInfo from './cycleinfo';
import './periodInfo.css';
const periodInfo = () =>{

    return(
    <div className="infoContainer">
       <CycleInfo/>
        <NavBar/>
    </div>
    );
};
export default periodInfo;