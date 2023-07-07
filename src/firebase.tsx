// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDR4Ig2_MYzca769cgpxqqHHhU_eQLAA5w",
  authDomain: "carefinder-f97bb.firebaseapp.com",
  projectId: "carefinder-f97bb",
  storageBucket: "carefinder-f97bb.appspot.com",
  messagingSenderId: "405540239833",
  appId: "1:405540239833:web:fb545855e8af6a01d241c8",
  measurementId: "G-2LMQNT2GSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
logEvent(analytics, "notification_received");


export const auth = getAuth();

// Firestore
export const db = getFirestore();

// Google Auth Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// Sign in with Google
export const signInWithGoogle = () => signInWithPopup(getAuth(), provider);

// Sign up with email and password
export const signUp = (email: string, password: string) => createUserWithEmailAndPassword(getAuth(), email, password);



// Sign out
export const signOut = () => getAuth().signOut();

// Storage 
export const storage = getStorage();

// Upload image to storage
export const uploadImage = (file: any, name: string) => {
  const storageRef = ref(storage, name);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
}

// Get image url from storage
export const getImageUrl = (name: string) => {
  const storageRef = ref(storage, name);
  return getDownloadURL(storageRef);
}





export default auth;