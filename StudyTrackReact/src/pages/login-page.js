import { useState } from "react";

export function useCadastroForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Lógica de cadastro aqui (ex: chamar uma API)
    window.location.href = "sucesso.html";
  }

  return { nome, setNome, email, setEmail, senha, setSenha, handleSubmit };
}

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Lógica de login aqui (ex: chamar uma API)
    window.location.href = "sucesso.html";
  }

  return { email, setEmail, senha, setSenha, handleSubmit };
}

export function useTela() {
  const [tela, setTela] = useState("cadastro");
  const irParaLogin = () => setTela("login");
  const irParaCadastro = () => setTela("cadastro");
  return { tela, irParaLogin, irParaCadastro };
}