import React, { useState, useEffect } from 'react';
import NavBar from "../components/NavBar";
import Music from '../components/music';
import Timer from "../components/Timer";
import medInfo from "./medInfo";

const Meditation = () =>{
    return(<div>
        <NavBar/>
        <Music/>
        <Timer seconds={300} /> 
        <medInfo />  
    </div>
    );

};

export default Meditation;









