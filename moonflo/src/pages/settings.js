import React from "react";
import NavBar from "../components/NavBar";
import { signOut } from "firebase/auth";
import { database } from '../FirebaseConfig.js'; 
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const history = useNavigate();

    const handleClick = () => {
        signOut(database) 
            .then((val) => {
                console.log(val);
                history('/');
            })
            .catch(error => {
                console.error("Error signing out:", error);
            });
    };

    return (
        <div>
            <h1>Settings</h1>
            <button onClick={handleClick}>Sign Out</button>
            <NavBar />
        </div>
    );
};

export default Settings;
