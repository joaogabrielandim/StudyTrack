import Navbar from "../components/Navbar"
import "./planner-page.css";
import { useState, useCallback, useEffect } from "react";
import api from "../services/api"; // ajuste o caminho conforme seu projeto

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const COLORS = ["#1D9E75", "#378ADD", "#D85A30", "#7F77DD", "#D4537E", "#BA7517", "#E24B4A"];

function fmtDate(d) {
  return (
    d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

const today = new Date();
const todayStr = fmtDate(today);

// Mapeia tarefa da API → formato interno do componente
function fromApi(doc, idx) {
  return {
    id: doc.id,
    name: doc.titulo ?? "(sem título)",
    date: doc.data ?? todayStr,
    color: COLORS[idx % COLORS.length],
    done: doc.concluida ?? false,
  };
}

// ─── styles (igual ao seu original) ──────────────────────────────────────────
const s = {
  wrap: { display: "grid", gridTemplateColumns: "1fr", gap: 16, fontFamily: "system-ui, sans-serif" },
  panel: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.25rem" },
  panelTitle: { fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 16 },
  calHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  calMonth: { fontSize: 15, fontWeight: 600, color: "#111827" },
  navBtn: { background: "none", border: "1px solid #e5e7eb", borderRadius: 8, width: 28, height: 28, cursor: "pointer", fontSize: 16, color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 },
  calGrid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 },
  dayLabel: { textAlign: "center", fontSize: 10, fontWeight: 600, color: "#9ca3af", paddingBottom: 4 },
  cell: (isToday, otherMonth, hasTask) => ({ aspectRatio: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: 4, borderRadius: 6, fontSize: 12, fontWeight: hasTask ? 600 : 400, color: isToday ? "#fff" : otherMonth ? "#d1d5db" : hasTask ? "#111827" : "#6b7280", background: isToday ? "#378ADD" : "transparent", cursor: "default", userSelect: "none" }),
  dotRow: { display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", marginTop: 2 },
  dot: (color) => ({ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }),
  taskList: { display: "flex", flexDirection: "column", gap: 8 },
  taskItem: (removing) => ({ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 8, transition: "opacity 0.35s, transform 0.35s, max-height 0.35s", opacity: removing ? 0 : 1, transform: removing ? "scale(0.95)" : "scale(1)", overflow: "hidden", maxHeight: removing ? 0 : 80 }),
  colorDot: (color) => ({ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 4 }),
  taskInfo: { flex: 1, minWidth: 0 },
  taskName: { fontSize: 13, fontWeight: 500, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  taskDate: { fontSize: 11, color: "#9ca3af", marginTop: 2 },
  checkCircle: (checked) => ({ width: 18, height: 18, borderRadius: "50%", border: checked ? "none" : "1.5px solid #d1d5db", background: checked ? "#1D9E75" : "transparent", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s, border-color 0.2s", marginTop: 1 }),
  checkMark: { color: "#fff", fontSize: 10, fontWeight: 700, lineHeight: 1 },
  addRow: { display: "flex", gap: 6, marginTop: 12 },
  addInput: { flex: 1, fontSize: 13, padding: "6px 10px", border: "1px solid #e5e7eb", borderRadius: 8, background: "#f9fafb", color: "#111827", outline: "none", minWidth: 0 },
  addDate: { fontSize: 12, padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 8, background: "#f9fafb", color: "#111827", outline: "none" },
  addBtn: { padding: "6px 12px", border: "1px solid #d1d5db", borderRadius: 8, background: "none", color: "#374151", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" },
  empty: { fontSize: 13, color: "#9ca3af", textAlign: "center", padding: "1.5rem 0" },
  loadingMsg: { fontSize: 13, color: "#9ca3af", textAlign: "center", padding: "1.5rem 0" },
  errorMsg: { fontSize: 13, color: "#D85A30", textAlign: "center", padding: "0.5rem 0" },
};

// ─── sub-componentes (iguais ao seu original) ─────────────────────────────────

function CheckCircle({ checked, onClick }) {
  return (
    <button onClick={onClick} style={s.checkCircle(checked)} aria-label="Marcar como concluída" aria-checked={checked} role="checkbox">
      {checked && <span style={s.checkMark}>✓</span>}
    </button>
  );
}

function TaskItem({ task, onToggle }) {
  const [removing, setRemoving] = useState(false);
  const handleToggle = () => {
    setRemoving(true);
    setTimeout(() => onToggle(task.id), 350);
  };
  const [y, m, d] = task.date.split("-");
  return (
    <div style={s.taskItem(removing)}>
      <div style={s.colorDot(task.color)} />
      <div style={s.taskInfo}>
        <div style={s.taskName}>{task.name}</div>
        <div style={s.taskDate}>{`${d}/${m}/${y}`}</div>
      </div>
      <CheckCircle checked={task.done} onClick={handleToggle} />
    </div>
  );
}

function Calendar({ tasks, year, month, onPrev, onNext }) {
  const activeTasks = tasks.filter((t) => !t.done);
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: prevDays - firstDay + 1 + i, otherMonth: true, tasks: [] });
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
    cells.push({ day: d, otherMonth: false, dateStr, tasks: activeTasks.filter((t) => t.date === dateStr) });
  }
  const remaining = cells.length % 7 === 0 ? 0 : 7 - (cells.length % 7);
  for (let i = 1; i <= remaining; i++) cells.push({ day: i, otherMonth: true, tasks: [] });

  return (
    <div style={s.panel}>
      <div style={s.panelTitle}>Calendário</div>
      <div style={s.calHeader}>
        <button style={s.navBtn} onClick={onPrev}>‹</button>
        <span style={s.calMonth}>{MONTHS[month]} {year}</span>
        <button style={s.navBtn} onClick={onNext}>›</button>
      </div>
      <div style={s.calGrid}>
        {DAYS.map((d) => <div key={d} style={s.dayLabel}>{d}</div>)}
        {cells.map((cell, i) => (
          <div key={i} style={s.cell(!cell.otherMonth && cell.dateStr === todayStr, cell.otherMonth, cell.tasks.length > 0)}>
            {cell.day}
            {cell.tasks.length > 0 && (
              <div style={s.dotRow}>
                {cell.tasks.map((t) => <div key={t.id} style={s.dot(t.color)} />)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Checklist({ tasks, loading, error, onToggle, onAdd }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState(todayStr);
  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name.trim(), date || todayStr);
    setName("");
  };
  const active = [...tasks].filter((t) => !t.done).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div style={s.panel}>
      <div style={s.panelTitle}>Tarefas</div>
      {error && <div style={s.errorMsg}>{error}</div>}
      <div style={s.taskList}>
        {loading ? (
          <div style={s.loadingMsg}>Carregando tarefas…</div>
        ) : active.length === 0 ? (
          <div style={s.empty}>Nenhuma tarefa pendente 🎉</div>
        ) : (
          active.map((t) => <TaskItem key={t.id} task={t} onToggle={onToggle} />)
        )}
      </div>
      <div style={s.addRow}>
        <input style={s.addInput} placeholder="Nova tarefa..." value={name} maxLength={40}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()} />
        <input style={s.addDate} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button style={s.addBtn} onClick={handleAdd}>+ Add</button>
      </div>
    </div>
  );
}

// ─── main export ──────────────────────────────────────────────────────────────

export default function CalendarChecklist() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colorIdx, setColorIdx] = useState(0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // Carrega tarefas da API ao montar
  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get("/listar");
        setTasks(data.map((doc, idx) => fromApi(doc, idx)));
        setColorIdx(data.length % COLORS.length);
      } catch (err) {
        setError("Erro ao carregar tarefas. Tente recarregar a página.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  // Marca como concluída → PUT na API + remove visualmente
  const handleToggle = useCallback(async (id) => {
  try {
    await api.delete(`/deletar/${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  } catch (err) {
    console.error("Erro ao deletar tarefa:", err);
    setError("Erro ao deletar tarefa.");
  }
}, []);

  // Adiciona → POST na API → adiciona no estado com o id retornado
  const handleAdd = useCallback(async (name, date) => {
    try {
      const { data } = await api.post("/salvar", {
        titulo: name,
        data: date,
        materia: "",       // campo obrigatório na sua API; ajuste se quiser coletar do usuário
        prioridade: "normal", // idem
        concluida: false,
      });
      const newTask = {
        id: data.id,
        name,
        date,
        color: COLORS[colorIdx % COLORS.length],
        done: false,
      };
      setTasks((prev) => [...prev, newTask]);
      setColorIdx((c) => c + 1);
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
      setError("Erro ao salvar tarefa.");
    }
  }, [colorIdx]);

  const prevMonth = () => setViewMonth((m) => { if (m === 0) { setViewYear((y) => y - 1); return 11; } return m - 1; });
  const nextMonth = () => setViewMonth((m) => { if (m === 11) { setViewYear((y) => y + 1); return 0; } return m + 1; });

  return (
    <div className="body-planner">
      <Navbar />
      <main className="conteudo-planner">
        <div className="planner-container-restrito">
          <div className="col-tarefas">
            <Calendar tasks={tasks} year={viewYear} month={viewMonth} onPrev={prevMonth} onNext={nextMonth} />
          </div>
          <div className="col-calendario">
            <Checklist tasks={tasks} loading={loading} error={error} onToggle={handleToggle} onAdd={handleAdd} />
          </div>
        </div>
      </main>
    </div>
  );
}