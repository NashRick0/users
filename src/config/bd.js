import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexión establecida'))
    .catch((error) => console.log('Error en la conexión', error));

export default sequelize;