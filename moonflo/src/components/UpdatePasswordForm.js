import React, { useState } from "react";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from '../FirebaseConfig.js'; 
import { Button } from "react-bootstrap";

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
      console.error("Error updating password:", error);
      setError(error.message); // Set user-friendly error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label htmlFor="currentPassword">Current Password: </label>
        <input
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
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          required
        />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
};

export default UpdatePasswordForm;
