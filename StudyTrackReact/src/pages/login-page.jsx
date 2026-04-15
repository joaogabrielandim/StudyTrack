import "./login-page.css";
import { useCadastroForm, useLoginForm, useTela } from "./login-page.js";

function CadastroForm({ onSwitch }) {
  const { nome, setNome, email, setEmail, senha, setSenha, handleSubmit } = useCadastroForm();

  return (
    <div className="card">
      <div className="titulo_article">
        <h1 className="titulo">Cadastro</h1>
        <p className="titulo2">Crie sua conta para começar</p>
      </div>
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <label className="labor" htmlFor="nome">Nome</label>
          <input className="input" type="text" id="nome" required name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <label className="labor" htmlFor="email">E-mail</label>
          <input className="input" type="email" id="email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="labor" htmlFor="senha">Senha</label>
          <input className="input" type="password" id="senha" required name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <button className="botao" type="submit">Cadastrar</button>
        </form>
        <button className="link" onClick={onSwitch}>Já tem uma conta? Faça login</button>
      </div>
    </div>
  );
}

function LoginForm({ onSwitch }) {
  const { email, setEmail, senha, setSenha, handleSubmit } = useLoginForm();

  return (
    <div className="card">
      <div className="titulo_article">
        <h1 className="titulo">Login</h1>
        <p className="titulo2">Entre na sua conta pra continuar</p>
      </div>
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <label className="labor" htmlFor="email-login">E-mail</label>
          <input className="input" type="email" id="email-login" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="labor" htmlFor="senha-login">Senha</label>
          <input className="input" type="password" id="senha-login" required name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <button className="botao" type="submit">Entrar</button>
        </form>
        <button className="link" onClick={onSwitch}>Não tem uma conta? Cadastre-se</button>
      </div>
    </div>
  );
}

export default function Login() {
  const { tela, irParaLogin, irParaCadastro } = useTela();

  return (
    <main>
      <section className="apresentacao">
        <div className="studytrackimg">
          <img src="../assets/logostsó.png" className="imagem_logo" alt="Logo StudyTrack" />
          <h1 className="studytrack">StudyTrack</h1>
        </div>
        <h1 className="subtitulo">Acompanhe seu estudo</h1>
        <p className="descricao">
          Organize suas tarefas, monitore seu progresso e alcance seus objetivos de estudo com facilidade
        </p>
      </section>

      {tela === "cadastro" ? (
        <CadastroForm onSwitch={irParaLogin} />
      ) : (
        <LoginForm onSwitch={irParaCadastro} />
      )}
    </main>
  );
}