
const express = require('express');


// routes const :
const userRoutes = require('./routes/user-routes')
const postRoutes = require('./routes/post-routes')


// express
const app = express();

// utilitaire object

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// route user :
app.use("/api/users", userRoutes);
// route post :
app.use("/api/posts", postRoutes);
// route test :



module.exports = app;