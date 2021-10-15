import cluster from 'cluster';
import http from 'http';
import server from './server.js';
import os from 'os';
import { setupMaster, setupWorker } from '@socket.io/sticky';
import { createAdapter, setupPrimary } from '@socket.io/cluster-adapter';

const numCPUs = os.cpus().length;

import { Server } from 'socket.io';
import socket from '../helpers/socket.js';

// const io = new Server(server);
// socket(io);
const count = (process.env.COUNT_CLUSTERS < numCPUs) ? process.env.COUNT_CLUSTERS : numCPUs


if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    

    // Fork workers.
    for (let i = 0; i < count; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

    
} else {
    try {

        const io = new Server(server);
        socket(io);

        server.listen(process.env.PORT, () => {
            console.log(`server started. listening port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error(error);
    }

    console.log(`Worker ${process.pid} started`);
}