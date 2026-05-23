import { useState } from "react";
import Navbar from "../components/Navbar";
import Homejs from "./home-page";
import "./home-page.css";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

function TooltipBarras({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 13,
      color: "#111827",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    }}>
      <strong>{label}</strong>
      <div style={{ marginTop: 2, color: "#378ADD" }}>
        {payload[0].value}h estudadas
      </div>
    </div>
  );
}

function TooltipRosca({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 13,
      color: "#111827",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    }}>
      <strong>{payload[0].name}</strong>
      <div style={{ marginTop: 2, color: payload[0].payload.fill }}>
        {payload[0].value}h
      </div>
    </div>
  );
}

function EmptyChart({ mensagem }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      color: "#9ca3af",
      fontSize: 13,
    }}>
      {mensagem}
    </div>
  );
}

// Skeleton para cards de estatísticas durante carregamento
function StatCardSkeleton() {
  return (
    <div className="cartao" style={{ opacity: 0.5 }}>
      <div className="titulo-cartao" style={{
        background: "#e5e7eb",
        borderRadius: 4,
        height: 14,
        width: "60%",
        marginBottom: 10,
      }} />
      <div style={{
        background: "#e5e7eb",
        borderRadius: 4,
        height: 28,
        width: "40%",
      }} />
    </div>
  );
}

function Home({ abrirModal, sessoes, onDeletar, recarregarStats }) {
  const {
    dataCompleta,
    horasEstudo,
    tarefasConcluidas,
    sessoesHoje,
    sequencia,
    carregando,
    dadosBarras,
    dadosRosca,
    tarefasRecentes,
    proximasSessoes,
  } = Homejs(recarregarStats);

  return (
    <div className="container-principal">
      <Navbar />

      <div className="conteudo-principal">

        {/* Cabeçalho */}
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

        {/* Botão adicionar sessão */}
        <div id="div-botao">
          <button id="botao-sessao" onClick={abrirModal}>
            Adicionar Sessão
          </button>
        </div>

        {/* Cards de sessões recém adicionadas — só renderiza se houver sessões */}
        {sessoes.length > 0 && (
          <div id="sessao-estudos">
            {sessoes.map((sessao) => (
              <div key={sessao.id} className="card-sessao">
                <button
                  className="card-sessao-deletar"
                  onClick={() => onDeletar(sessao.id)}
                >
                  ✕
                </button>
                <div className="card-sessao-materia">{sessao.materia}</div>
                <div className="card-sessao-info">
                  <span>📚 {sessao.tempoEstudo}</span>
                  <span>⏱ {sessao.horas}h {sessao.minutos}min</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cartões de estatísticas */}
        <div className="linha-estatisticas">
          {carregando ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <div className="cartao">
                <div className="titulo-cartao">Horas de Estudo</div>
                <div className="valor-cartao">{horasEstudo}</div>
              </div>
              <div className="cartao">
                <div className="titulo-cartao">Tarefas Concluídas</div>
                <div className="valor-cartao">{tarefasConcluidas}</div>
              </div>
              <div className="cartao">
                <div className="titulo-cartao">Sessões de Estudo</div>
                <div className="valor-cartao">{sessoesHoje}</div>
              </div>
              <div className="cartao">
                <div className="titulo-cartao">Sequência</div>
                <div className="valor-cartao">{sequencia} 🔥</div>
              </div>
            </>
          )}
        </div>

        {/* Linha de gráficos */}
        <div className="linha-conteudo">

          {/* Gráfico de Barras */}
          <div className="caixa-conteudo">
            <div className="titulo-caixa">Horas de Estudo (últimos 7 dias)</div>
            <div style={{ width: "100%", height: 220 }}>
              {carregando ? (
                <EmptyChart mensagem="Carregando dados..." />
              ) : dadosBarras.length === 0 ? (
                <EmptyChart mensagem="Nenhuma sessão registrada ainda." />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosBarras} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="dia"
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      axisLine={false}
                      tickLine={false}
                      unit="h"
                    />
                    <Tooltip content={<TooltipBarras />} cursor={{ fill: "rgba(55,138,221,0.08)" }} />
                    <Bar dataKey="horas" fill="#378ADD" radius={[6, 6, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Gráfico de Rosca */}
          <div className="caixa-conteudo">
            <div className="titulo-caixa">Distribuição por Matéria</div>
            <div style={{ width: "100%", height: 220 }}>
              {carregando ? (
                <EmptyChart mensagem="Carregando dados..." />
              ) : dadosRosca.length === 0 ? (
                <EmptyChart mensagem="Nenhuma sessão registrada ainda." />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dadosRosca}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {dadosRosca.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<TooltipRosca />} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={(value) => (
                        <span style={{ fontSize: 12, color: "#374151" }}>{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Linha de listas */}
        <div className="linha-conteudo">

          {/* Tarefas Recentes */}
          <div className="caixa-conteudo">
            <div className="titulo-caixa">Tarefas Recentes</div>
            {carregando ? (
              <div style={{ color: "#9ca3af", fontSize: 13, padding: "1rem 0" }}>
                Carregando tarefas...
              </div>
            ) : tarefasRecentes.length === 0 ? (
              <div style={{ color: "#9ca3af", fontSize: 13, padding: "1rem 0" }}>
                Nenhuma tarefa concluída ainda.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                {tarefasRecentes.map((t) => (
                  <div key={t.id} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    fontSize: 13,
                  }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: "#1D9E75", flexShrink: 0,
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontWeight: 500, color: "#111827",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        textDecoration: "line-through", opacity: 0.6,
                      }}>
                        {t.titulo}
                      </div>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>{t.materia}</div>
                    </div>
                    <span style={{
                      fontSize: 11, padding: "2px 8px", borderRadius: 99,
                      background: "#d1fae5", color: "#065f46", fontWeight: 500,
                    }}>
                      ✓ Concluída
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sessões de hoje */}
          <div className="caixa-conteudo">
            <div className="titulo-caixa">Sessões de Hoje</div>
            {carregando ? (
              <div style={{ color: "#9ca3af", fontSize: 13, padding: "1rem 0" }}>
                Carregando sessões...
              </div>
            ) : proximasSessoes.length === 0 ? (
              <div style={{ color: "#9ca3af", fontSize: 13, padding: "1rem 0" }}>
                Nenhuma sessão registrada hoje.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                {proximasSessoes.map((s) => (
                  <div key={s.id} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    fontSize: 13,
                  }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: "#378ADD", flexShrink: 0,
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontWeight: 500, color: "#111827",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>
                        {s.materia}
                      </div>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>
                        📚 {s.tempoEstudo} · ⏱ {s.horas}h {s.minutos}min
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;