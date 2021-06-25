
const express = require('express');


// routes const :
const userRoutes = require('./routes/user-routes')

const app = express();

// utilitaire object

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// route use :
app.use("/api/users", userRoutes);


// route test :



module.exports = app;