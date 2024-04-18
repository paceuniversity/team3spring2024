import React from "react";
import NavBar from "../components/NavBar";
import { signOut } from "firebase/auth";
import { auth } from '../FirebaseConfig.js'; 
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "react-bootstrap";
import DeleteAccount from "../components/DeleteAccount";
import "./settings.css";


const Settings = () => {
    const history = useNavigate();

    const handleClick = () => {
        signOut(auth) 
            .then((val) => {
                console.log(val);
                history('/');
            })
            .catch(error => {
                console.error("Error signing out:", error);
            });
    };

    return (
        <div className="setting-card-container">
            <Card className="setting-card">
                <CardBody className="setting-card-body">
                    <h1>Settings</h1>
                    <Button className="setting-button" onClick={handleClick}>Sign Out</Button>
                    <DeleteAccount/>
                    <NavBar />
                </CardBody>
            </Card>
        </div>
    );
};

export default Settings;
