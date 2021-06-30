const express = require('express');

//securité
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit"); 



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10000 // limit each IP to 10000(POUR DEV) requests per windowMs
  });



// routes const :
const userRoutes = require('./routes/user-routes')
const postRoutes = require('./routes/post-routes')
const likeRoutes = require('./routes/like-routes');
const commentRoutes =require('./routes/comment-routes');

// express
const app = express();





// utilitaire object

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//securité :
app.use(cors());
app.use(helmet());
app.use(limiter) ;



// route user :
app.use("/api/users", userRoutes);
// route post :
app.use("/api/posts", postRoutes);
// route like :
app.use("/api/rate", likeRoutes);
// route comment :
app.use("/api/comment", commentRoutes);


module.exports = app;