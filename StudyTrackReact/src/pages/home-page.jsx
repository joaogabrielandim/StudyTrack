import Navbar from "../components/Navbar"
import Homejs from "./home-page"
import "./home-page.css"


function Home() {

const { dataCompleta, adicionarSessao } = Homejs();

    return (
    <div className="container-principal">
 
      <Navbar />
 
      <div className="conteudo-principal">
 
        <div className="cabecalho">
          <div className="texto-boas-vindas">
            <div className="titulo-boas-vindas">Bem-vindo! 👋</div>
            <div className="subtitulo-boas-vindas">Aqui está um resumo do seu progresso</div>
          </div>
          <div className="info-data">
            <div className="dia-texto">Hoje</div>
            <div className="data-completa"><strong>{dataCompleta}</strong></div>
          </div>
        </div>
 
        <div id="div-botao">
          <button id="botao-sessao" onClick={adicionarSessao}>Adicionar Sessão</button>
        </div>
 
        <div id="sessao-estudos">
          <div className="estudos">
          </div>
        </div>
 
        <div className="linha-estatisticas">
          <div className="cartao">
            <div className="titulo-cartao">Horas de Estudo</div>
            <div className="valor-cartao"></div>
          </div>
          <div className="cartao">
            <div className="titulo-cartao">Tarefas Concluídas</div>
            <div className="valor-cartao"></div>
          </div>
          <div className="cartao">
            <div className="titulo-cartao">Sessões de Estudo</div>
            <div className="valor-cartao"></div>
          </div>
          <div className="cartao">
            <div className="titulo-cartao">Sequência</div>
            <div className="valor-cartao"></div>
          </div>
        </div>
 
        <div className="linha-conteudo">
          <div className="caixa-conteudo">
            <div className="titulo-caixa">Horas de Estudo</div>
            <div className="espaco-reservado">[Área do Gráfico de Barras]</div>
          </div>
          <div className="caixa-conteudo">
            <div className="titulo-caixa">Distribuição por Matéria</div>
            <div className="espaco-reservado">[Área do Gráfico de Rosca]</div>
          </div>
        </div>
 
        <div className="linha-conteudo">
          <div className="caixa-conteudo">
            <div className="titulo-caixa">Tarefas Recentes</div>
            <div className="espaco-reservado">[Área da Lista de Tarefas]</div>
          </div>
          <div className="caixa-conteudo">
            <div className="titulo-caixa">Próximas Sessões</div>
            <div className="espaco-reservado">[Área da Lista de Sessões]</div>
          </div>
        </div>
 
      </div>
    </div>
    )
}

export default Home