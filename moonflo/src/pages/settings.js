import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { signOut } from "firebase/auth";
import { auth } from '../FirebaseConfig.js'; 
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "react-bootstrap";
import DeleteAccount from "../components/DeleteAccount";
import DisplayPeriodInfo from "../components/DisplayPeriodInfo";
import { BsPencilSquare, BsXCircle } from "react-icons/bs"; // Import icons
import "./settings.css";

const Settings = () => {
    const history = useNavigate();
    const [isEdit, setIsEdit] = useState(false); // State to manage edit mode

    const handleClick = () => {
        signOut(auth) 
            .then(() => {
                history('/');
            })
            .catch(error => {
                console.error("Error signing out:", error);
            });
    };

    const handleEditClick = () => {
        setIsEdit(!isEdit);
    };

    return (
        <div className="setting-card-container">
          <Card className="setting-card">
            <CardBody className="setting-card-body">
              <h1>Settings</h1>
              <a className="edit-button" onClick={handleEditClick}>
                {isEdit ? <BsXCircle/> : <BsPencilSquare />}
              </a>
              <DisplayPeriodInfo isEdit={isEdit} />
              {!isEdit && (
                <>
                  <Button className="setting-button" onClick={handleClick}>
                    Sign Out
                  </Button>
                  <DeleteAccount />
                </>
              )}
              <NavBar />
            </CardBody>
          </Card>
        </div>
      );      
};

export default Settings;
