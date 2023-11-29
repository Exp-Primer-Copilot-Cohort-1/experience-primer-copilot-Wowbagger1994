//create web server
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3000;
const path = require('path');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//get all comments
app.get('/comments', (req, res) => {
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data));
        }
    })
});

//get single comment
app.get('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const comments = JSON.parse(data);
            const comment = comments.find(comment => comment.id === id);
            if (comment) {
                res.json(comment);
            } else {
                res.status(404).json({error: `Comment with id ${id} not found`});
            }
        }
    })
});

//create new comment
app.post('/comments', (req, res) => {
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const comments = JSON.parse(data);
            const newComment = {
                id: comments.length + 1,
