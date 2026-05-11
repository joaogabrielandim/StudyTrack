import express from "express";
import { getFirestore } from "firebase-admin/firestore";
import { fileURLToPath} from "url";
import { readFileSync } from "fs";
import admin from "firebase-admin";
import { dirname } from "path";
import cors from "cors";

const __dirname = dirname(fileURLToPath(import.meta.url))

var serviceAccount = JSON.parse(readFileSync(`${__dirname}/../../studytrack-82d9b-firebase-adminsdk-fbsvc-af00119cfe.json`))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = getFirestore();

const app = express();

app.use(cors());

app.use(express.json());


const autenticarUsuario = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.uid = decoded.uid; // UID disponível nas rotas
    next();
  } catch (err) {
    res.status(401).json({ erro: "Token inválido" });
  }
};

app.post("/salvar", autenticarUsuario, async (req, res) => {
  try {
    const { titulo, materia, prioridade } = req.body; // campos atualizados

    const docRef = await db.collection("usuarios").doc(req.uid)
      .collection("tarefas").add({ titulo, materia, prioridade });

    res.status(201).json({ mensagem: "Salvo com sucesso", id: docRef.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET - listar só as tarefas do usuário logado
app.get("/listar", autenticarUsuario, async (req, res) => {
  try {
    const snapshot = await db.collection("usuarios").doc(req.uid)
      .collection("tarefas").get();

    const dados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(dados);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE
app.delete("/deletar/:id", autenticarUsuario, async (req, res) => {
  try {
    await db.collection("usuarios").doc(req.uid)
      .collection("tarefas").doc(req.params.id).delete();

    res.json({ mensagem: "Deletado com sucesso" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT
app.put("/editar/:id", autenticarUsuario, async (req, res) => {
  try {
    await db.collection("usuarios").doc(req.uid)
      .collection("tarefas").doc(req.params.id).update(req.body);

    res.json({ mensagem: "Atualizado com sucesso" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));