import "./login-page.css"
import { Trocar, CreateUser, LoginUser } from "./login-page"
import ImagemLogo from "../assets/logostsó.png"
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "react-auth-verification-context";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    function cadastro(e) {
        e.preventDefault();
        const nome = document.getElementById("nome-cadastro-login").value;
        const email = document.getElementById("email-cadastro-login").value;
        const senha = document.getElementById("senha-cadastro-login").value;
        CreateUser(email,senha,nome);
    }

    function entrar(e) {

        e.preventDefault();
        const email = document.getElementById("email-login").value;
        const senha = document.getElementById("senha-login").value;
        LoginUser(email,senha,navigate,login);
    }

    return (
        <main>
            {/* A tela que aparece ao clicar pra realizar o cadastro */}
            <section id="apresentacao-login">
                <div id="studytrackimg-login">
                <img src={ImagemLogo} id="imagem_logo-login" alt="Logo StudyTrack" />
                <h1 className="fontesans-login" id="studytrack-login">StudyTrack</h1>
                </div>
                <h1 className="fontesans-login">Acompanhe seu estudo</h1>
                <p className="fontesans-login" id="descricao-login">
                Organize suas tarefas, monitore seu progresso e alcance <br /> seus
                objetivos de estudo com facilidade
                </p>
            </section>
        
            {/* A tela que aparece ao clicar pra realizar o cadastro */}
            <section id="cadastro-login">
                <article className="titulo_article-login">
                <h1 className="titulo-login">Cadastro</h1>
                <p id="titulo2-login">Crie sua conta para começar</p>
                </article>
                <article className="article-form-login" >
                <form onSubmit={cadastro} id="form_cadastro-login">
                    <label htmlFor="nome-cadastro-login">Nome</label>
                    <input type="text" id="nome-cadastro-login" required name="nome" placeholder=" Nome"/>
                    <label htmlFor="email-cadastro-login">E-mail</label>
                    <input type="email" id="email-cadastro-login" required name="email" placeholder=" E-mail"/>
                    <label htmlFor="senha-cadastro-login">Senha</label>
                    <input type="password" id="senha-cadastro-login" required name="senha" placeholder=" Senha"/>
                    <input id="cadastrar-login" type="submit" value="Cadastrar" />
                </form>
                <a href="#" onClick={() => Trocar('cadastro2-login')}>Já tem uma conta? Faça login</a>
                </article>
            </section>        
            {/* A tela que aparece ao clicar para realizar o login */}
            <section id="cadastro2-login">
                <article className="titulo_article-login">
                <h1 className="titulo-login">Login</h1>
                <p id="titulo2-login">Entre na sua conta pra continuar</p>
                </article>
                <article className="article-form-login">
                <form onSubmit={entrar} id="form_cadastro-login">
                    <label htmlFor="email-login">E-mail</label>
                    <input type="email" id="email-login" required name="email" placeholder=" E-mail" />
                    <label htmlFor="senha-login">Senha</label>
                    <input type="password" id="senha-login" required name="senha" placeholder=" Senha"/>
                    <input id="cadastrar-login" type="submit" value="Entrar" />
                </form>
                <a href="#" onClick={() => Trocar('cadastro-login')}>Não tem uma conta? Cadastre-se</a>
                </article>
            </section>
        </main>
    )
}

export default Login