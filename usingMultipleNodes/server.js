// packages
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
dotenv.config();
// routes
import ApiUserRoutes from '../routes/ApiUserRoutes.js';
import UserRoutes from '../routes/UserRoutes.js';

const app = express();

await mongoose
    .connect(process.env.DB_URL)
    .then((res) => console.log('connect to DB'))
    .catch((error) => console.log(error));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());

app.use(ApiUserRoutes);
app.use(UserRoutes);

app.get('/', (req, res) => {
    res.send(`<p><a href="/map">map</a><p><p><a href="/boarding">boarding</a></p>`);
});

app.use((req, res) => {
    res.status(404).send('Error page: something wrong')
});

const server = http.createServer(app);

export default server;