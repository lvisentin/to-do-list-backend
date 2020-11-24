import express from 'express';
import mongoose from 'mongoose';
import Tasks from './models/Task.js';
import Cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({path: './.env'});

const app = express();
const port = process.env.PORT || 8001;

const conn_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rzlwi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(express.json());
app.use(Cors());

mongoose.connect(conn_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

app.get('/', (request, response) => {
    response.status(200).send('hello world');
})

app.get('/tasks', (request, response) => {
    Tasks.find((err, data) => {
        if (err) {
            response
                .status(500)
                .send(err)
        } else {
            response
                .status(200)
                .send(data)
        }
    })
})

app.post('/tasks', (request, response) => {
    const tasks = request.body;

    Tasks.create(tasks, (err, data) => {
        if (err) {
            response
                .status(500)
                .send(err)
        } else {
            response
                .status(200)
                .send(data)
        }
    })
});

app.delete('/tasks', (request, response) => {
    const filter = request.body;

    Tasks.deleteOne(filter, (err, data) => {
        if (err) {
            response
                .status(500)
                .send(err)
        } else {
            response
                .status(200)
                .send(data)
        }
    })
});

app.listen(port, () => console.log('process', process.env.DB_NAME))