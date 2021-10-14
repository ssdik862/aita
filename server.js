import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';



import User from './models/users.js'
import createPath from './helpers/createPath.js';




const app = express();
app.set('view engine', 'ejs');

import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
import ApiUserRoutes from './routes/ApiUserRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
const io = new Server(server);

const PORT = 3000;
const DB_URL = "mongodb+srv://aita_user:app_in_the_air@cluster0.m5dvo.mongodb.net/node-aita?retryWrites=true&w=majority";



app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
// app.use('/api', router);

// app.use(userRoutes);
app.use(ApiUserRoutes);
app.use(UserRoutes);

async function startApp() {
    await mongoose
        .connect(DB_URL)
        .then((res) => console.log('connect to DB'))
        .catch((error) => console.log(error))
    try {
        server.listen(PORT, () => {
            console.log(`server started. listening port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};
startApp();

/**
 * @swagger
 * 
 */
app.get('/', (req, res) => {
    // const title = 'Home';
    // res.render(createPath('index'), { title });
    res.send(`
        <p><a href="/map">map</a><p>
        <p><a href="/boarding">boarding</a></p>
    `);
});

io.on('connection', (socket) => {
    console.log('a user connected');

    setInterval(async () => {
        const users = await User.find();
        // console.log('users', users);
        io.emit('chat message', users)
    }, 5000);

});

app.get('/map', async (req, res) => {
    const users = await User.find();
    res.render(createPath('map'), { users });
    // res.render('../views/map.ejs', { users });
});


// app.get('/checkInviteCode/:code', async (req, res) => {

//     const userCode = req.params.code;

//     try {
//         const user = await User.findOne({accessCode : userCode});
//         // const arr = await Movie.find({ year: { $gte: 1980, $lte: 1989 } });
//         console.log('user', user);
//         if (user instanceof User) {
//             res.json({
//                 isInvitationValid : user.isCodeValid,
//                 userName : user.name,
//                 userId : user.id
//             });
//         };

//         res.json(user);

//     } catch (error) {
//         console.error(error);
//         res.send(`upsss`);
//     }

// });

//JsBarcode("#itf-14", "1234567890123", {format: "itf14"});
// <svg id="itf-14"></svg>

app.use((req, res) => {
    res
        .status(404)
        .send('something wrong')
});

// aita_user
//app_in_the_air


//TODO add compression
// add cluters https://nodejs.org/api/cluster.html 