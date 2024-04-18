import { useState } from "react";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'; // Import Firebase auth methods
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const auth = getAuth(); // Initialize Firebase auth
    const navigate = useNavigate();

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
    
        // Create the credential
        const credential = EmailAuthProvider.credential(
            currentUser.email,
            password
        );
    
        try {
            // Re-authenticate the user with the credential
            await reauthenticateWithCredential(currentUser, credential);
            // If reauthentication succeeds, delete the account
            await currentUser.delete();
            console.log("Account deleted successfully!");
            // Show confirmation message
            alert("Your account has been successfully deleted.");
            // Redirect to the homepage
            navigate('/');
        } catch (error) {
                setError("Incorrect password, please try again.");
                console.error("Error deleting account:", error);
            }
    };      

    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={toggleModal}>
                Delete Account
            </button>
            {showModal && (
                <div className="modal fade show" tabIndex="-1" style={{ display: "block" }} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" onClick={toggleModal}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content" onClick={handleModalContentClick}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Delete Account</h5>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete your account?</p>
                                <p>Confirm password to delete</p>
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
                                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleDeleteAccount}>Yes, Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteAccount;
