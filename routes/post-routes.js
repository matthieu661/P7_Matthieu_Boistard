const express = require('express');
const router = express.Router();
const postCreate =require("../controllers/Post/createPost");
const postGetOne = require("../controllers/Post/getOnePost");
const postGetAll = require("../controllers/Post/getAllPost");
const postModify = require("../controllers/Post/modifyPost");
const postDelete = require("../controllers/Post/deletePost");

// function CRUD
//create
router.post("/createPost", postCreate.createPost);
//getOne
router.get("/getOnePost/:id", postGetOne.getOnePost);
//getAll
router.get("/getAllPost", postGetAll.getAllPost );
//modify
router.put("/modifyPost/:id", postModify.modifyPost );
//delete
router.delete('/deletePost/:id', postDelete.deletePost);






module.exports = router;