// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCom_s-cUmjedAbCtf8bxci-U1SETzAQGo",
  authDomain: "studytrack-82d9b.firebaseapp.com",
  projectId: "studytrack-82d9b",
  storageBucket: "studytrack-82d9b.firebasestorage.app",
  messagingSenderId: "39025001445",
  appId: "1:39025001445:web:48812050ce49521a26e50c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth,app};
