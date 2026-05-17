import Navbar from "../components/Navbar";
import Homejs from "./home-page";
import "./home-page.css";
import Modal from "./scroolview";
import { useState, useEffect } from "react";
import { onSessoesChange, deletarSessao, onTarefasChange } from "../services/firestore";

function Home({ abrirModal, isModalOpen, fecharModal }) {
  const { dataCompleta } = Homejs();
  const [sessoes,    setSessoes]    = useState([]);
  const [tarefas,    setTarefas]    = useState([]);

  // Escuta sessões em tempo real
  useEffect(() => {
    const unsub = onSessoesChange(setSessoes);
    return () => unsub();
  }, []);

  // Escuta tarefas em tempo real (para os cards de estatísticas)
  useEffect(() => {
    const unsub = onTarefasChange(setTarefas);
    return () => unsub();
  }, []);

  const totalHoras = sessoes.reduce((acc, s) => acc + (Number(s.horas) || 0) + (Number(s.minutos) || 0) / 60, 0);
  const tarefasConcluidas = tarefas.filter((t) => t.concluida).length;

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
          <button id="botao-sessao" onClick={abrirModal}>
            Adicionar Sessão
          </button>
        </div>

        {/* SESSÕES SALVAS */}
        <div id="sessao-estudos">
          {sessoes.length === 0 ? (
            <p style={{ color: "#9ca3af", fontSize: 14, padding: "8px 0" }}>
              Nenhuma sessão registrada. Clique em "Adicionar Sessão" para começar!
            </p>
          ) : (
            sessoes.map((s) => (
              <div key={s.id} className="estudos" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: "#fff", borderRadius: 10, padding: "12px 18px", marginBottom: 10, border: "1px solid #e5e7eb" }}>
                <div>
                  <strong style={{ fontSize: 15 }}>{s.materia}</strong>
                  <span style={{ marginLeft: 12, fontSize: 13, color: "#6b7280" }}>
                    {s.horas}h {s.minutos}min
                  </span>
                </div>
                <button
                  onClick={() => deletarSessao(s.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 18, lineHeight: 1 }}
                  title="Remover sessão"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* ESTATÍSTICAS */}
        <div className="linha-estatisticas">
          <div className="cartao">
            <div className="titulo-cartao">Horas de Estudo</div>
            <div className="valor-cartao">{totalHoras.toFixed(1)}h</div>
          </div>
          <div className="cartao">
            <div className="titulo-cartao">Tarefas Concluídas</div>
            <div className="valor-cartao">{tarefasConcluidas}</div>
          </div>
          <div className="cartao">
            <div className="titulo-cartao">Sessões de Estudo</div>
            <div className="valor-cartao">{sessoes.length}</div>
          </div>
          <div className="cartao">
            <div className="titulo-cartao">Total de Tarefas</div>
            <div className="valor-cartao">{tarefas.length}</div>
          </div>
        </div>

        <div className="linha-conteudo">
          <div className="caixa-conteudo">
            <div className="titulo-caixa">Tarefas Recentes</div>
            {tarefas.slice(0, 5).map((t) => (
              <div key={t.id} style={{ padding: "8px 0", borderBottom: "1px solid #f3f4f6", fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: t.concluida ? "#10b981" : "#f59e0b", display: "inline-block", flexShrink: 0 }} />
                <span style={{ color: t.concluida ? "#9ca3af" : "#111", textDecoration: t.concluida ? "line-through" : "none" }}>{t.titulo}</span>
                <span style={{ marginLeft: "auto", fontSize: 12, color: "#9ca3af" }}>{t.materia}</span>
              </div>
            ))}
            {tarefas.length === 0 && <div style={{ color: "#9ca3af", fontSize: 13, paddingTop: 8 }}>Nenhuma tarefa ainda.</div>}
          </div>
          <div className="caixa-conteudo">
            <div className="titulo-caixa">Próximas Sessões</div>
            {sessoes.slice(0, 5).map((s) => (
              <div key={s.id} style={{ padding: "8px 0", borderBottom: "1px solid #f3f4f6", fontSize: 14 }}>
                <strong>{s.materia}</strong> — {s.horas}h {s.minutos}min
              </div>
            ))}
            {sessoes.length === 0 && <div style={{ color: "#9ca3af", fontSize: 13, paddingTop: 8 }}>Nenhuma sessão ainda.</div>}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={fecharModal} />
    </div>
  );
}

export default Home;
