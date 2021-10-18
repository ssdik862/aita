import mongoose from 'mongoose';
const DB_URI = process.env.DB_URL;

function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URI)
            .then((res, err) => {
                if (err) return reject(err);
                console.log('connect to DB')
                resolve();
            })
    })
};

function close() {
    return mongoose.disconnect();
};

export default { connect, close };