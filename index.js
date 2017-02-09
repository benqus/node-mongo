/**
 * Created by Bence Kormos on 09/02/2017.
 */
const http = require('http');
const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');

const db = require('./db');

const Todo = require('./model/todo');

const init = () => {

    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/', serveStatic(path.join(__dirname, 'public')));

    app.get('/', (req, res) => {
       res.sendFile(path.resolve('./public/index.html'));
    });

    app.get('/todos', (req, res) => {

        Todo.find({})
            .then(todos => res.status(200).json(todos))
            .catch(err => res.status(err.statusCode || 500).json(err));

    });

    app.post('/todos', (req, res) => {
        const text = req.body['todo-text'];
        const todo = new Todo({ text });
        todo.save()
            .then(todo => res.redirect(req.headers.referer));
    });

    app.delete('/todos/:id', (req, res) => {
        const { id } = req.params;
        Todo.findByIdAndRemove(id)
            .then(() => res.status(200).json({}));
    });

    const server = http.Server(app);
    server.listen(5555);
};

db(init);
