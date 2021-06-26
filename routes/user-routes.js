const express = require('express');
const router = express.Router();
const userReg = require("../controllers/Account/userRegister");
const userLog = require("../controllers/Account/userLogin");
const userGetOne = require("../controllers/Account/onAccount/getOneUser") 
const userGetAll = require("../controllers/Account/onAccount/getAllUser")
const userModify = require("../controllers/Account/onAccount/modifyUser")
const userDelete = require("../controllers/Account/onAccount/deleteUser");

router.post("/register", userReg.register );
router.post("/login", userLog.login );
// function CRUD
//getOne
router.get("/getOneUser/:id", userGetOne.getOneUser);
//getAll
router.get("/getAllUsers", userGetAll.getAllUser );
//modify
router.put("/modifyUser/", userModify.modifyUser );
//delete
router.delete('/deleteUser/', userDelete.deleteUser);


module.exports = router;