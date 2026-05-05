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
  await db.collection("teste").add(req.body);
  res.json({mensagem: "Salvo"});
});

app.get("/listar", async (req, res) => {
  const snapshot = await db.collection("teste").get();
  const dados = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  res.json(dados);
});

exports.api = onRequest(app);
