const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true }));

// Rota GET
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Olá do Firebase Functions!' });
});

// Rota POST
app.post('/data', (req, res) => {
  const data = req.body;
  res.status(200).json({ message: 'Dados recebidos com sucesso!', data });
});

// Rota PUT
app.put('/update', (req, res) => {
  const updateData = req.body;
  res.status(200).json({ message: 'Dados atualizados com sucesso!', updateData });
});

// Rota DELETE
app.delete('/delete', (req, res) => {
  res.status(200).json({ message: 'Dados deletados com sucesso!' });
});


exports.api = functions.https.onRequest(app);

