require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
var logger = require('morgan');

const todo = require("./models/todo");
const dbuser = process.env.DBUSER || "your_login";
const dbpass = process.env.DBPASS || "your_password";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));

app.post("/", (req, res) => {
    if (!req.body) return res.sendStatus(400);
    res.send(req.body)
});

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${ dbuser }:${ dbpass }@cluster0.s0t5j.mongodb.net/todos`, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log("Server was started");
        })
    } catch (e) {
        console.log(e);
    }
}

start()