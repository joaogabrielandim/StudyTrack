import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export function CreateUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

export function LoginUser(email, password, navigate) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
    })
    .then(() =>{
        navigate("/home")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

export function Trocar(id) {
    let cadastro = document.getElementById("cadastro-login");
    let cadastro2 = document.getElementById("cadastro2-login");

    cadastro.style.display = "none"
    cadastro2.style.display = "none"

    document.getElementById(id).style.display = "flex"
}
