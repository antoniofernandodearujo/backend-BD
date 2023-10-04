import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
// Configure as informações de conexão com o PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    }
  );
  

export default sequelize;
