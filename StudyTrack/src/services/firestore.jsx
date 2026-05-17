// ============================================================
//  SERVIÇO FIRESTORE — StudyTrack
//  Usa onAuthStateChanged para garantir que o uid do usuário
//  está disponível antes de qualquer operação no banco.
// ============================================================

import {
  collection, addDoc, deleteDoc, updateDoc,
  doc, onSnapshot, query, orderBy, serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";

// ─── helpers ─────────────────────────────────────────────────────────────────

/** Retorna o uid assim que o Firebase Auth estiver pronto */
function getUidAsync() {
  if (auth.currentUser) return Promise.resolve(auth.currentUser.uid);
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      if (user) resolve(user.uid);
      else reject(new Error("Usuário não autenticado"));
    });
  });
}

/**
 * Cria um listener que espera o auth antes de chamar onSnapshot.
 * Resolve o race condition de autenticação.
 */
function criarListener(colName, callback) {
  let innerUnsub = () => {};

  const authUnsub = onAuthStateChanged(auth, (user) => {
    innerUnsub(); // cancela listener anterior se houver
    if (!user) { callback([]); return; }

    const q = query(
      collection(db, "usuarios", user.uid, colName),
      orderBy("criadaEm", "desc")
    );
    innerUnsub = onSnapshot(q, (snap) => {
      callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }, (err) => {
      console.error(`Erro ao escutar ${colName}:`, err.code, err.message);
    });
  });

  return () => { authUnsub(); innerUnsub(); };
}

// ─── TAREFAS ─────────────────────────────────────────────────────────────────

export const onTarefasChange = (cb) => criarListener("tarefas", cb);

export async function adicionarTarefa({ titulo, materia, prioridade }) {
  const uid = await getUidAsync();
  await addDoc(collection(db, "usuarios", uid, "tarefas"), {
    titulo, materia, prioridade, concluida: false, criadaEm: serverTimestamp(),
  });
}

export async function alternarTarefa(id, concluida) {
  const uid = await getUidAsync();
  await updateDoc(doc(db, "usuarios", uid, "tarefas", id), { concluida });
}

export async function deletarTarefa(id) {
  const uid = await getUidAsync();
  await deleteDoc(doc(db, "usuarios", uid, "tarefas", id));
}

// ─── SESSÕES ─────────────────────────────────────────────────────────────────

export const onSessoesChange = (cb) => criarListener("sessoes", cb);

export async function adicionarSessao({ materia, horas, minutos }) {
  const uid = await getUidAsync();
  await addDoc(collection(db, "usuarios", uid, "sessoes"), {
    materia, horas: Number(horas) || 0, minutos: Number(minutos) || 0,
    criadaEm: serverTimestamp(),
  });
}

export async function deletarSessao(id) {
  const uid = await getUidAsync();
  await deleteDoc(doc(db, "usuarios", uid, "sessoes", id));
}

// ─── EVENTOS DO CALENDÁRIO ───────────────────────────────────────────────────

export const onEventosChange = (cb) => criarListener("eventos", cb);

export async function adicionarEvento({ name, date, color }) {
  const uid = await getUidAsync();
  await addDoc(collection(db, "usuarios", uid, "eventos"), {
    name, date, color, done: false, criadaEm: serverTimestamp(),
  });
}

export async function alternarEvento(id) {
  const uid = await getUidAsync();
  await updateDoc(doc(db, "usuarios", uid, "eventos", id), { done: true });
}
