import { useState, useEffect } from "react";
import "./task-page.css";
import Navbar from "../components/Navbar";
import Modal2 from "./scroolview2";
import api from "../services/api";

function Task() {
  const [isOpen2, setIsOpen2] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const totalTarefas = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;
  const porcentagem = totalTarefas > 0 ? Math.round((concluidas / totalTarefas) * 100) : 0;

  const pendentes = tarefas.filter(t => !t.concluida);
  const feitas = tarefas.filter(t => t.concluida);

  useEffect(() => {
    async function fetchTarefas() {
      try {
        setLoading(true);
        setErro(null);
        const { data } = await api.get("/listar");
        setTarefas(data.map(doc => ({
          id: doc.id,
          titulo: doc.titulo,
          materia: doc.materia,
          prioridade: doc.prioridade ?? "Média",
          concluida: doc.concluida ?? false,
        })));
      } catch (err) {
        console.error("Erro ao carregar tarefas:", err);
        setErro("Não foi possível carregar as tarefas.");
      } finally {
        setLoading(false);
      }
    }
    fetchTarefas();
  }, []);

  const adicionarTarefa = () => {
    async function recarregar() {
      try {
        const { data } = await api.get("/listar");
        setTarefas(data.map(doc => ({
          id: doc.id,
          titulo: doc.titulo,
          materia: doc.materia,
          prioridade: doc.prioridade ?? "Média",
          concluida: doc.concluida ?? false,
        })));
      } catch (err) {
        console.error("Erro ao recarregar tarefas:", err);
      }
    }
    recarregar();
  };

  const alternarConclusao = async (id) => {
    const tarefa = tarefas.find(t => t.id === id);
    const novoStatus = !tarefa.concluida;
    try {
      await api.put(`/editar/${id}`, { concluida: novoStatus });
      setTarefas(prev => prev.map(t => t.id === id ? { ...t, concluida: novoStatus } : t));
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
    }
  };

  const deletarTarefa = async (id) => {
    try {
      await api.delete(`/deletar/${id}`);
      setTarefas(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
    }
  };

  const CardTarefa = ({ item, mostrarCheck = true }) => (
    <div className="card-tarefa-item">
      <div className="lado-esquerdo-card">
        {mostrarCheck && (
          <input
            type="checkbox"
            className="checkbox-tarefa"
            checked={item.concluida}
            onChange={() => alternarConclusao(item.id)}
          />
        )}
        <div className="info-tarefa">
          <span className={`titulo-tarefa ${item.concluida ? 'texto-riscado' : ''}`}>
            {item.titulo}
          </span>
          <span className="detalhes-tarefa">
            {item.materia} • <span className={`prioridade-${item.prioridade.toLowerCase()}`}>{item.prioridade}</span>
          </span>
        </div>
      </div>
      <button onClick={() => deletarTarefa(item.id)} className="btn-deletar-tarefa">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  );

  return (
    <div className="principal-task">
      <Navbar />
      <main className="conteudo-principal-task">
        <div className="cabecalho-task">
          <div className="cabecalho-topo">
            <h1>Tarefas</h1>
            <button className="botao-nova-tarefa" onClick={() => setIsOpen2(true)}>
              Nova Tarefa
            </button>
          </div>
          <p>Gerencie suas atividades de curso!</p>
        </div>

        <div className="box-task">
          <div className="coluna-cards-task">

            {/* PROGRESSO */}
            <div className="boxprogresso-task">
              <div className="divInterna1-task">
                <div className="progresso-header">
                  <span className="progresso-titulo">Progresso Geral</span>
                  <span className="progresso-contagem">{concluidas}/{totalTarefas} concluídas</span>
                </div>
                <div className="barra-progresso-container">
                  <div className="barra-progresso-fill" style={{ width: `${porcentagem}%` }}></div>
                </div>
                <span className="progresso-porcentagem-texto">
                  {porcentagem}% das tarefas concluídas
                </span>
              </div>
            </div>

            {/* MINHAS TAREFAS (pendentes) */}
            <div className="boxhoras-task">
              <div className="divInterna2-task">
                <h3 className="titulo-secao-tarefas">Minhas Tarefas</h3>
                <div className="checklist-container">
                  {loading ? (
                    <div className="empty-state"><p>Carregando tarefas…</p></div>
                  ) : erro ? (
                    <div className="empty-state"><p style={{ color: "#D85A30" }}>{erro}</p></div>
                  ) : pendentes.length === 0 ? (
                    <div className="empty-state"><p>Nenhuma tarefa pendente 🎉</p></div>
                  ) : (
                    pendentes.map(item => <CardTarefa key={item.id} item={item} />)
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* TAREFAS FEITAS */}
          <div className="TarefasPorFazer-task">
            <div className="divInterna3-task">
              <h3 className="titulo-secao-tarefas">Tarefas Feitas</h3>
              <div className="checklist-container">
                {feitas.length === 0 ? (
                  <div className="empty-state"><p>Nenhuma tarefa concluída ainda.</p></div>
                ) : (
                  feitas.map(item => <CardTarefa key={item.id} item={item} mostrarCheck={false} />)
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal2
        isOpen2={isOpen2}
        onClose2={() => setIsOpen2(false)}
        onAdicionar={adicionarTarefa}
      />
    </div>
  );
}

export default Task;