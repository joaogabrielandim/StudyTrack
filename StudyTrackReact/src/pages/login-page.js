import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";


export function CreateUser(email, password, nome) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("Cadastro realizado com sucesso!");

        return updateProfile(user, {
            displayName: nome
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        
        if (errorCode === "auth/email-already-in-use") {
            alert("E-mail já cadastrado");
        } else if (errorCode === "auth/invalid-email") {
            alert("E-mail inválido");
        } else if (errorCode === "auth/weak-password") {
            alert("Senha fraca, mínimo 12 caracteres");
        } else if (errorCode === "auth/password-does-not-meet-requirements") {
            alert("Senha inválida, a senha precisa conter um caractere maiúsculo e minúsculo, um caractere especial e um numérico")
        } else {
            alert(errorCode);
        }
    });
}

export function LoginUser(email, password, navigate, loginAuth) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        loginAuth({ name: user.displayName, id: user.uid });
    })
    .then(() =>{
        navigate("/home")
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
            alert("E-mail não encontrado");
        } else if (errorCode === "auth/wrong-password") {
            alert("Senha incorreta");
        } else if (errorCode === "auth/invalid-credential") {
            alert("E-mail ou senha inválidos");
        } else if (errorCode === "auth/user-disabled") {
            alert("Usuário desativado no console")
        } else if (errorCode === "auth/too-many-requests") {
            alert("Muitas tentativas, conta temporáriamente bloqueada")
        } else {
            alert(errorCode);
        }
    });
}

export function Trocar(id) {
    let cadastro = document.getElementById("cadastro-login");
    let cadastro2 = document.getElementById("cadastro2-login");

    cadastro.style.display = "none"
    cadastro2.style.display = "none"

    document.getElementById(id).style.display = "flex"
}
