
const express = require('express');



const app = express();

// utilitaire object

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes const :

// route use :

// route test :
app.use('/', function (req, res) {
    res.setHeader( 'Content-Type', 'text/html');
    res.status(200).send('<H1>hello, bienvenue sur mon server test</h1>');
})


module.exports = app;