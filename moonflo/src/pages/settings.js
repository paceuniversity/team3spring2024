import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "react-bootstrap";
import DeleteAccount from "../components/DeleteAccount";
import DisplayPeriodInfo from "../components/DisplayPeriodInfo";
import { BsPencilSquare, BsXCircle } from "react-icons/bs";
import UpdatePasswordForm from "../components/UpdatePasswordForm"; // Import the UpdatePasswordForm component
import "./settings.css";

const Settings = () => {
  const history = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const auth = getAuth();

  const fetchUserEmail = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });
  };

  useEffect(() => {
    fetchUserEmail();
  }, []);

  const handleClick = () => {
    signOut(auth)
      .then(() => {
        history("/");
      })
      .catch((error) => {
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
          <h1>Account Info</h1>
          <a className="edit-button" onClick={handleEditClick}>
            {isEdit ? <BsXCircle /> : <BsPencilSquare />}
          </a>
          {isEdit ? (
            <DisplayPeriodInfo isEdit={true} />
          ) : (
            <div className="email-password-container">
              <DisplayPeriodInfo isEdit={false} />
              <p>Email: {userEmail}</p>
              <p>Password: *********</p>
            </div>
          )}
          {isEdit && <UpdatePasswordForm />} {/* Render UpdatePasswordForm only when isEdit is true */}
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
