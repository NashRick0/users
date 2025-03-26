import bodyParser from 'body-parser';
import express from 'express';
import usersRoles from './routes/usersRoute.js';
import swaggerSpec from './api-docs.js';
import swaggerUi from 'swagger-ui-express';

//const { conectarRabbit } = require('./rabbitmq');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', usersRoles);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//conectarRabbitMQ();

export default app;