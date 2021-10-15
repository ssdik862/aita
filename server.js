// packages
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();
// routes
import ApiUserRoutes from './routes/ApiUserRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
// socket
import socket from './helpers/socket.js';

const app = express();
const server = http.createServer(app);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());

async function startApp() {
    await mongoose
        .connect(process.env.DB_URL)
        .then((res) => console.log('connect to DB'))
        .catch((error) => console.log(error));
    try {
        server.listen(process.env.PORT, () => {
            console.log(`server started. listening port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};
startApp();

const io = new Server(server);
socket(io);


app.use(ApiUserRoutes);
app.use(UserRoutes);

app.get('/', (req, res) => {
    res.send(`<p><a href="/map">map</a><p><p><a href="/boarding">boarding</a></p>`);
});

app.use((req, res) => {
    res.status(404).send('Error page: something wrong')
});