// packages
import http from 'http';
// modules
import app from './app.js';
import db  from './db/index.js';
// socket
import socket from './helpers/socket.js';
import { Server } from 'socket.io';

db.connect()
.then(() => {
    const server = http.createServer(app);
    const io = new Server(server);

    server.listen(process.env.PORT, () => {
      console.log(`server started. listening port ${process.env.PORT}`);
    });
    socket(io);
});
