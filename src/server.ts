// src/server.ts
import express from 'express';
import router from './routes/Routes';
import sequelize from './db';

const app = express();


// Sincronizar o Sequelize com o banco de dados
sequelize
  .sync()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

app.use(express.json());
app.use('/api', router); // Use as rotas com prefixo "/api"

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API ONLINE na porta ${port} `);
});
