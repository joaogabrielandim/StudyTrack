import "./Navbar.css";
import homeicon     from "../assets/homeicon.svg";
import taskicon     from "../assets/taskicon.svg";
import calendaricon from "../assets/calendaricon.svg";
import logouticon   from "../assets/user-logout.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

function Navbar() {
  const [nomeUsuario,  setNomeUsuario]  = useState("Usuário");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [inicial,      setInicial]      = useState("U");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const nome = user.displayName || "Usuário";
        setNomeUsuario(nome);
        setEmailUsuario(user.email || "");
        setInicial(nome.charAt(0).toUpperCase());
      }
    });
    return () => unsubscribe();
  }, []);

  function handleLogout() {
    signOut(auth); // App.jsx detecta via onAuthStateChanged e redireciona para /
  }

  return (
    <section id="idnavbar" className="navbar">
      <div className="div-titulo">
        <h1 className="titulo">StudyTrack</h1>
      </div>

      <nav>
        <Link to="/home"><img src={homeicon} className="icon" /> Início</Link>
        <Link to="/tarefas"><img src={taskicon} className="icon" /> Tarefas</Link>
        <Link to="/calendario"><img src={calendaricon} className="icon" /> Calendário</Link>
      </nav>

      <div className="perfil-usuario">
        <div className="user-info-wrapper">
          <div className="avatar">{inicial}</div>
          <div className="info-usuario">
            <div className="nome">{nomeUsuario}</div>
            <div className="email">{emailUsuario}</div>
          </div>
        </div>
        <div className="acoes-usuario">
          <button onClick={handleLogout} className="botao-perfil botao-logout">
            <img src={logouticon} className="icon-small" />
            Sair da conta
          </button>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
