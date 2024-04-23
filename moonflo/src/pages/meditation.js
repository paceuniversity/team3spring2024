import React from "react";
import NavBar from "../components/NavBar";
import Timer from "../components/Timer";
import medInfo from "./medInfo";

const Meditation = () => {
    return (
        <div>
            <NavBar />
            <Timer seconds={300} /> 
            <medInfo />  // Include the medInfo component in the render
        </div>
    );
};

export default Meditation;









