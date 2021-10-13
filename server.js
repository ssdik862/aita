const express = require("express");
const morgan = require("morgan");
const path = require('path');
const mongoose = require("mongoose");

const shortid = require('shortid');

const User = require('./models/users')


var JsBarcode = require('jsbarcode');

const { DOMImplementation, XMLSerializer } = require('xmldom');
const xmlSerializer = new XMLSerializer();
const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

//TODO add compression
// add cluters https://nodejs.org/api/cluster.html 

const app = express();
app.set('view engine', 'ejs');
const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`);
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const db = "mongodb+srv://aita_user:app_in_the_air@cluster0.m5dvo.mongodb.net/node-aita?retryWrites=true&w=majority";

mongoose
    .connect(db)
    .then((res) => console.log('connect to DB'))
    .catch((error) => console.log(error))

server.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

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
        io.emit('chat message', `${users}`)
    }, 5000);

});

app.get('/map', async (req, res) => {
    const users = await User.find();
    res.render(createPath('map'), { users });
});

app.get('/add-user', (req, res) => {
    const user = new User(
        {
            name : 'Ivan',
            distance : 25,
            hours: 786,
        }
    );

    user
        .save()
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((error) => {
            console.log(error);
            res
            .status(404)
            .send('something wrong  when post added')
        });
});

app.get('/generateInviteCode/:id', async (req, res) => {

    const userId = req.params.id;
    const code = shortid.generate();

    let user = undefined;

    try {
        user = await User.findById(userId);
        console.log(user);
        if (user instanceof User) {
            user.accessCode = code;
            user.isCodeValid = true;
            await user.save();
        };
        
        JsBarcode(svgNode, code, {
            xmlDocument: document,
        });
        
        const svgText = xmlSerializer.serializeToString(svgNode);
    
        res.send(`
            <p>passanger name: ${user.name}</p>
            <p>id: ${req.params.id}</p>
            <pre><code>${user}</pre></code>
            ${svgText}
        `);
    } catch (error) {
        console.error(error);
    }

});


app.get('/checkInviteCode/:code', async (req, res) => {

    const userCode = req.params.code;

    try {
        const user = await User.findOne({accessCode : userCode});
        // const arr = await Movie.find({ year: { $gte: 1980, $lte: 1989 } });
        console.log('user', user);
        if (user instanceof User) {
            res.json({
                isInvitationValid : user.isCodeValid,
                userName : user.name,
                userId : user.id
            });
        };

        res.json(user);

    } catch (error) {
        console.error(error);
        res.send(`upsss`);
    }

});

//JsBarcode("#itf-14", "1234567890123", {format: "itf14"});
// <svg id="itf-14"></svg>

app.use((req, res) => {
    res
        .status(404)
        .send('something wrong')
});

// aita_user
//app_in_the_air

