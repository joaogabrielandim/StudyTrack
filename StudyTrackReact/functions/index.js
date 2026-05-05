const express = require("express");
const {onRequest} = require("firebase-functions/https");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK");
});

app.post("/salvar", async (req, res) => {
  try {
    await db.collection("teste").add(req.body);
    res.json({mensagem: "Salvo com sucesso"});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/listar", async (req, res) => {
  try {
    const snapshot = await db.collection("teste").get();
    const dados = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(dados);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/deletar/:id", async (req, res) => {
  try {
    await db.collection("teste").doc(req.params.id).delete();
    res.json({mensagem: "Deletado com sucesso"});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/editar/:id", async (req, res) => {
  try {
    await db.collection("teste").doc(req.params.id).update(req.body);
    res.json({mensagem: "Atualizado com sucesso"});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

exports.api = onRequest(app);