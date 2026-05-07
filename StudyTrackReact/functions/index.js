import express from "express";
import { getFirestore } from "firebase-admin/firestore";
import { fileURLToPath} from "url";
import { readFileSync } from "fs";
import admin from "firebase-admin";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url))

var serviceAccount = JSON.parse(readFileSync(`${__dirname}/studytrack-82d9b-firebase-adminsdk-fbsvc-d4261bf7e4.json`))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = getFirestore();

const app = express();
app.use(express.json());

/* TESTE */
app.get("/", (req, res) => {
  res.send("API OK");
});

/* CREATE */
app.post("/salvar", async (req, res) => {
  try {

    const { teste, legal } = req.body;

    const data = { 
      teste, 
      legal, 
    };

    const docRef = await db.collection("tarefas").add(data);

    res.status(201).json({
      mensagem: "Salvo com sucesso",
      id: docRef.id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* READ */
app.get("/listar", async (req, res) => {
  try {
    const snapshot = await db.collection("tarefas").get();

    const dados = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(dados);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* DELETE */
app.delete("/deletar/:id", async (req, res) => {
  try {
    await db.collection("tarefas").doc(req.params.id).delete();

    res.json({ mensagem: "Deletado com sucesso" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* UPDATE */
app.put("/editar/:id", async (req, res) => {
  try {
    await db.collection("tarefas").doc(req.params.id).update(req.body);

    res.json({ mensagem: "Atualizado com sucesso" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));