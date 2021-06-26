
const express = require('express');


// routes const :
const userRoutes = require('./routes/user-routes')


// express
const app = express();

// utilitaire object

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// route user :
app.use("/api/users", userRoutes);
// route post :

// route test :



module.exports = app;