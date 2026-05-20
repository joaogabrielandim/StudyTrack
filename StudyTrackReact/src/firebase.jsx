import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCom_s-cUmjedAbCtf8bxci-U1SETzAQGo",
  authDomain: "studytrack-82d9b.firebaseapp.com",
  projectId: "studytrack-82d9b",
  storageBucket: "studytrack-82d9b.firebasestorage.app",
  messagingSenderId: "39025001445",
  appId: "1:39025001445:web:48812050ce49521a26e50c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db };