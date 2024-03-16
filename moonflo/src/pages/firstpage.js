import React from "react";
import "../App.css";
import Lottie from "react-lottie";
import animationData from "../lotties/background.json";
const firstpage = () => {
    const defaultOptions = {
     loop: true,
     autoplay: true, 
     animationData: animationData,
     rendererSettings: {
        preserveAspectRation : "xMidYMid slice"
       }
    };

    return ( 
        <div className="full-screen"> {/* Added full-screen class */}
          <div className="lottie-container"> {/* Added lottie-container class */}
            <Lottie options={defaultOptions}/>
          </div>
        </div>
   );
}

export default firstpage;