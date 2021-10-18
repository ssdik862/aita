// packages
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
// routes
import ApiUserRoutes from './routes/ApiUserRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
// swagger
import swaggerUI from 'swagger-ui-express';
import specs from './helpers/swagger.js';

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(compression());

app.use(ApiUserRoutes);
app.use(UserRoutes);

app.get('/', (req, res) => {
    res.send(`<p><a href="/map">map</a><p><p><a href="/boarding">boarding</a></p>`);
});

app.use((req, res) => {
    res.status(404).send('Error page: something wrong')
});


export default app;