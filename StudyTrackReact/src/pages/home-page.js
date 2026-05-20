import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function Homejs(recarregarStats = 0) {
  const [dataCompleta, setDataCompleta] = useState("");
  const [horasEstudo, setHorasEstudo] = useState("0h 0min");
  const [tarefasConcluidas, setTarefasConcluidas] = useState(0);
  const [sessoesHoje, setSessoesHoje] = useState(0);
  const [sequencia, setSequencia] = useState(0);

  useEffect(() => {
    const agora = new Date();
    const opcoes = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    setDataCompleta(agora.toLocaleDateString("pt-BR", opcoes));
  }, []);

  useEffect(() => {
    carregarEstatisticas();
  }, [recarregarStats]);

  useEffect(() => {
    registrarAcessoESequencia();
  }, []);

  async function carregarEstatisticas() {
    const inicioDia = new Date();
    inicioDia.setHours(0, 0, 0, 0);
    const fimDia = new Date();
    fimDia.setHours(23, 59, 59, 999);

    const qSessoes = query(
      collection(db, "sessoes"),
      where("criadoEm", ">=", Timestamp.fromDate(inicioDia)),
      where("criadoEm", "<=", Timestamp.fromDate(fimDia))
    );
    const snapSessoes = await getDocs(qSessoes);
    let totalMinutos = 0;
    snapSessoes.forEach(d => {
      const s = d.data();
      totalMinutos += (Number(s.horas) || 0) * 60 + (Number(s.minutos) || 0);
    });
    const horas = Math.floor(totalMinutos / 60);
    const minutos = totalMinutos % 60;
    setHorasEstudo(`${horas}h ${minutos}min`);
    setSessoesHoje(snapSessoes.size);

    const qTarefas = query(
      collection(db, "tarefas"),
      where("concluida", "==", true)
    );
    const snapTarefas = await getDocs(qTarefas);
    setTarefasConcluidas(snapTarefas.size);
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

      await setDoc(userRef, { ultimoAcesso: diaHoje, sequencia: seq }, { merge: true });
    } else {
      seq = userData.sequencia || 1;
    }

    setSequencia(seq);
  }

  function adicionarSessao() {
    const nova_sessao = document.createElement("div");
    nova_sessao.classList.add("estudos");
    document.getElementById("sessao-estudos").appendChild(nova_sessao);
  }

  return { dataCompleta, adicionarSessao, horasEstudo, tarefasConcluidas, sessoesHoje, sequencia };
}

export default Homejs;