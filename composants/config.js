// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  { getFirestore }from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries



const firebaseConfig = {

  apiKey: "AIzaSyC7xtr1Swj3zW5WoTzWv5Zfue19sXRRjFw",

  authDomain: "api-museum-e5b1f.firebaseapp.com",

  projectId: "api-museum-e5b1f",

  storageBucket: "api-museum-e5b1f.appspot.com",

  messagingSenderId: "654075153923",

  appId: "1:654075153923:web:b6d7ca65ad38e8085f0836",

  measurementId: "G-N1YF9CFH9H"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


const db = getFirestore(app); 

//const auth = getAuth(app); // Initialisez Firebase Authentication

//export { auth }; 
export default db;