import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import api from "../services/api";

function Homejs(recarregarStats = 0) {
  const [dataCompleta, setDataCompleta] = useState("");
  const [horasEstudo, setHorasEstudo] = useState("0h 0min");
  const [tarefasConcluidas, setTarefasConcluidas] = useState(0);
  const [sessoesHoje, setSessoesHoje] = useState(0);
  const [sequencia, setSequencia] = useState(0);
  const [carregando, setCarregando] = useState(true);

  const [dadosBarras, setDadosBarras] = useState([]);
  const [dadosRosca, setDadosRosca] = useState([]);
  const [tarefasRecentes, setTarefasRecentes] = useState([]);
  const [proximasSessoes, setProximasSessoes] = useState([]);

  useEffect(() => {
    const agora = new Date();
    const opcoes = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setDataCompleta(agora.toLocaleDateString("pt-BR", opcoes));
  }, []);

  useEffect(() => {
    carregarEstatisticas();
  }, [recarregarStats]);

  useEffect(() => {
    registrarAcessoESequencia();
  }, []);

  async function carregarEstatisticas() {
    setCarregando(true);
    try {
      const auth = getAuth();
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const inicioDia = new Date();
      inicioDia.setHours(0, 0, 0, 0);
      const fimDia = new Date();
      fimDia.setHours(23, 59, 59, 999);

      const qSessoes = query(
        collection(db, "sessoes"),
        where("uid", "==", uid),
        where("criadoEm", ">=", Timestamp.fromDate(inicioDia)),
        where("criadoEm", "<=", Timestamp.fromDate(fimDia))
      );
      const snapSessoes = await getDocs(qSessoes);

      let totalMinutos = 0;
      const sessoesHojeList = [];

      snapSessoes.forEach((d) => {
        const s = d.data();
        const mins = (Number(s.horas) || 0) * 60 + (Number(s.minutos) || 0);
        totalMinutos += mins;
        sessoesHojeList.push({
          id: d.id,
          materia: s.materia,
          horas: s.horas,
          minutos: s.minutos,
          tempoEstudo: s.tempoEstudo,
        });
      });

      const horas = Math.floor(totalMinutos / 60);
      const minutos = totalMinutos % 60;
      setHorasEstudo(`${horas}h ${minutos}min`);
      setSessoesHoje(snapSessoes.size);
      setProximasSessoes(sessoesHojeList);

      try {
        const { data: todasTarefas } = await api.get("/listar");

        const concluidas = todasTarefas.filter((t) => {
          const val = t.concluida;
      
          return val === true || val === 1 || val === "true";
        });

        setTarefasConcluidas(concluidas.length);

        const recentes = concluidas.slice(-5).reverse().map((t) => ({
          id: t.id,
          titulo: t.titulo,
          materia: t.materia,
        }));
        setTarefasRecentes(recentes);
      } catch (err) {
        console.error("Erro ao buscar tarefas da API:", err);
        setTarefasConcluidas(0);
        setTarefasRecentes([]);
      }

      const diasLabels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
      const hoje = new Date();
      const ultimos7 = [];

      for (let i = 6; i >= 0; i--) {
        const d = new Date(hoje);
        d.setDate(hoje.getDate() - i);
        const inicio = new Date(d);
        inicio.setHours(0, 0, 0, 0);
        const fim = new Date(d);
        fim.setHours(23, 59, 59, 999);
        ultimos7.push({
          label: diasLabels[d.getDay()],
          inicio: Timestamp.fromDate(inicio),
          fim: Timestamp.fromDate(fim),
          totalHoras: 0,
        });
      }

      const qSemana = query(
        collection(db, "sessoes"),
        where("uid", "==", uid),
        where("criadoEm", ">=", ultimos7[0].inicio),
        where("criadoEm", "<=", ultimos7[6].fim)
      );
      const snapSemana = await getDocs(qSemana);

      snapSemana.forEach((d) => {
        const s = d.data();
        const ts = s.criadoEm?.toDate?.() ?? new Date();
        const mins = (Number(s.horas) || 0) * 60 + (Number(s.minutos) || 0);

        for (const dia of ultimos7) {
          if (ts >= dia.inicio.toDate() && ts <= dia.fim.toDate()) {
            dia.totalHoras += mins / 60;
            break;
          }
        }
      });

      setDadosBarras(
        ultimos7.map((d) => ({
          dia: d.label,
          horas: parseFloat(d.totalHoras.toFixed(2)),
        }))
      );

      const materiaMap = {};
      snapSemana.forEach((d) => {
        const s = d.data();
        const materia = s.materia || "Outra";
        const mins = (Number(s.horas) || 0) * 60 + (Number(s.minutos) || 0);
        materiaMap[materia] = (materiaMap[materia] || 0) + mins;
      });

      const CORES_ROSCA = [
        "#378ADD", "#1D9E75", "#D85A30",
        "#7F77DD", "#D4537E", "#BA7517",
      ];
      const rosca = Object.entries(materiaMap).map(([name, mins], idx) => ({
        name,
        value: parseFloat((mins / 60).toFixed(2)),
        fill: CORES_ROSCA[idx % CORES_ROSCA.length],
      }));
      setDadosRosca(rosca);

    } finally {
      setCarregando(false);
    }
  }

  async function registrarAcessoESequencia() {
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const diaHoje = new Date().toISOString().split("T")[0];

    const userRef = doc(db, "usuarios", uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.exists() ? userSnap.data() : {};

    const ultimoAcesso = userData.ultimoAcesso || null;
    let seq = userData.sequencia || 0;

    if (ultimoAcesso !== diaHoje) {
      const ontem = new Date();
      ontem.setDate(ontem.getDate() - 1);
      const diaOntem = ontem.toISOString().split("T")[0];

      if (ultimoAcesso === diaOntem) {
        seq += 1;
      } else {
        seq = 1;
      }

      await setDoc(
        userRef,
        { ultimoAcesso: diaHoje, sequencia: seq },
        { merge: true }
      );
    } else {
      seq = userData.sequencia || 1;
    }

    setSequencia(seq);
  }

  return {
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
  };
}

export default Homejs;