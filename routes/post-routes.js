const express = require('express');
const router = express.Router();

const multer = require('../middlewares/multer-config');

const postCreate =require("../controllers/Post/createPost");
const postGetOne = require("../controllers/Post/getOnePost");
const postGetAll = require("../controllers/Post/getAllPost");
const postModify = require("../controllers/Post/modifyPost");
const postDelete = require("../controllers/Post/deletePost");
// Authentification
const Auth = require('../utils/jwt.utils');

// function CRUD
//create
router.post("/createPost", Auth.authRoutes, multer, postCreate.createPost);
//getOne
router.get("/getOnePost/:id", Auth.authRoutes, multer, postGetOne.getOnePost);
//getAll
router.get("/getAllPost", Auth.authRoutes, multer, postGetAll.getAllPost );
//modify
router.put("/modifyPost/:id", Auth.authRoutes, multer, postModify.modifyPost );
//delete
router.delete('/deletePost/:id', Auth.authRoutes, postDelete.deletePost);






module.exports = router;