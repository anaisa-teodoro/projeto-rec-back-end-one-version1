const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bem-vindo(a) ao projeto Viagem365!');
});

app.listen(3000, () => {
  console.log('Server do projeto Viagem365 rodando na porta 3000!');
});