const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();

const Todo = require("../models/todo");
const User = require("../models/users");

router.get('/', (req, res) => {
    res.send('index.html');
});

router.get("/auth", (req, res) => {
    const data = db.users.find({name: "Xelxeim"});
    res.send(data);
})

router.post("/register", (req, res) => {

    if (!req.body){
        return res.sendStatus(400);
    };
    const { username, password } = req.body;
    const newUser = new User({
        username: username,
        password: password
    });

    newUser.save(err => {
        if (err) throw err;
        console.log(`User ${username} successfully registered`);
    })
    res.redirect('/');
    res.sendStatus(200);

})

router.post("/auth", (req, res) => {

})

router.post("/", (req, res) => {
    if (!req.body){
        return res.sendStatus(400);
    };
    console.log(req.body);
    const  { task } = req.body;
    const newTask = new Todo({
        title: task
    });

    newTask.save(err => {
        if (err) throw err;
        console.log('Task successfully saved');
    });
});

function checkAuth(req, res, next) {
    if (req.session.user_id) {
      
    }
  }

module.exports = router;