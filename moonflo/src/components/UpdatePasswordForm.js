import React, { useState } from "react";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from '../FirebaseConfig.js'; 
import { Button } from "react-bootstrap";
import "./UpdatePasswordForm.css";

const UpdatePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
  
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return; // Exit if passwords don't match
    }
  
    const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
  
    try {
      // Reauthenticate the user
      await reauthenticateWithCredential(auth.currentUser, credential);
      // Update password
      await updatePassword(auth.currentUser, newPassword);
      console.log("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
       if (error.code === "auth/weak-password") {
        setError("Password is too weak. Use at least 6 characters.");
      } 
      else{
        setError("Incorrect password, please try again.");
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label htmlFor="currentPassword">Current Password: </label>
        <input
          className="password-form"
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={handleChangeCurrentPassword}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="newPassword">New Password: </label>
        <input
          className="password-form"
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={handleChangeNewPassword}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm New Password: </label>
        <input
          className="password-form"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          required
        />
      </div>
      <div className="password-save">
        <Button className="password-save-btn" type="submit">Update Password</Button>
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
