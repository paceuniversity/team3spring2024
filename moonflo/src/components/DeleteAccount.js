import { useState } from "react";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { getDatabase, ref, remove } from 'firebase/database'; // Import Firebase Realtime Database functions
import { useNavigate } from "react-router-dom";

import './DeleteAccount.css';

const DeleteAccount = () => {
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const auth = getAuth();
    const navigate = useNavigate();
    const database = getDatabase(); // Initialize Firebase Realtime Database

    const toggleModal = () => {
        setShowModal(!showModal);
        setPassword('');
        setError(null);
    };

    const handleDeleteAccount = async () => {
        if (!auth.currentUser) {
            setError("User not authenticated");
            return;
        }
    
        const { currentUser } = auth;
    
        const credential = EmailAuthProvider.credential(
            currentUser.email,
            password
        );
    
        try {
            await reauthenticateWithCredential(currentUser, credential);
            await currentUser.delete();
            console.log("Account deleted successfully!");
            // Delete user's information from the Realtime Database
            await deleteUserFromDatabase(currentUser.uid);
            alert("Your account has been successfully deleted.");
            navigate('/');
        } catch (error) {
            setError("Incorrect password, please try again.");
            console.error("Error deleting account:", error);
        }
    };      

    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

  
    const deleteUserFromDatabase = async (uid) => {
        const userRef = ref(database, 'users/' + uid); // Use uid directly as key
        try {
          console.log("Deleting user's information from the database");
          await remove(userRef);
          console.log("User's information deleted from the database");
        } catch (error) {
          console.error("Error deleting user's information from the database:", error);
        }
      };

    return (
        <div>
            <button className="delete-account-btn" onClick={toggleModal}>
                Delete Account
            </button>
            {showModal && (
                <div className="modal fade show" tabIndex="-1" style={{ display: "block" }} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" onClick={toggleModal}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content" onClick={handleModalContentClick}>
                            <div className="modal-header">
                                <h5 className="delete-account-title" id="exampleModalLongTitle">Delete Account</h5>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete your account?</p>
                                <p className="delete-text">Confirm password to delete</p>
                                <div className="input-box">
                                    <input 
                                        name="password" 
                                        type="password" 
                                        placeholder='Password' 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required 
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                            </div>
                            <div className="modal-footer">
                                <button className="delete-cancel-btn" onClick={toggleModal}>Cancel</button>
                                <button className="delete-confirm-btn" onClick={handleDeleteAccount}>Yes, Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteAccount;
