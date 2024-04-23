import React from "react";
import NavBar from "../components/NavBar";
import Timer from "../components/Timer"; // Ensure the path to Timer.js is correct based on your project structure

const Meditation = () => {
    return (
        <div>
            <NavBar />
            <Timer seconds={300} />  {/* For example, setting the timer to 5 minutes (300 seconds) */}
        </div>
    );
};

export default Meditation;




