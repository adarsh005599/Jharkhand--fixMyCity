import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // hard coded the API for the loacal testing. during need to use the env file
  apiKey: "AIzaSyA2oL5-ODl5ICXEjwHCUwaMdQKjSG4iELc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage, signOut };

