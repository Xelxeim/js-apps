const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();

const Todo = require("../models/todo");
const User = require("../models/users");

router.get('/', (req, res) => {
    res.send('index.html');
});

router.post("/", (req, res) => {
    if (!req.body){
        return res.sendStatus(400);
    };

    let  { task } = req.body;
    let newTask = new Todo({
        title: task
    });

    newTask.save(err => {
        if (err) throw err;
        console.log('Task successfully saved');
    });
});

module.exports = router;