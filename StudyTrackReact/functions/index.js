const express = require("express");
const { onRequest } = require("firebase-functions/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
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
    const data = req.body;

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

/* EXPORT FIREBASE */
exports.api = onRequest(app);