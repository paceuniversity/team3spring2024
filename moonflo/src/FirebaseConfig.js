import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDBNyEa8xr9rt2xiB8fGoc4XFxhVOkuwFw",
  authDomain: "moonflo-e5eaa.firebaseapp.com",
  projectId: "moonflo-e5eaa",
  storageBucket: "moonflo-e5eaa.appspot.com",
  messagingSenderId: "776971168195",
  appId: "1:776971168195:web:3b543101b790db9566f576"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);