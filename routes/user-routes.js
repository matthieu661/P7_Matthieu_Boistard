const express = require('express');
const router = express.Router();

// import 
const userReg = require("../controllers/Account/userRegister");
const userLog = require("../controllers/Account/userLogin");
const userGetOne = require("../controllers/Account/onAccount/getOneUser");
const userGetAll = require("../controllers/Account/onAccount/getAllUser");
const userModify = require("../controllers/Account/onAccount/modifyUser");
const userDelete = require("../controllers/Account/onAccount/deleteUser");
//validation
const userValidate = require("../middlewares/userValidation");
//Authentification
const Auth = require('../utils/jwt.utils');
// account
router.post("/register", userValidate.validationRegister, userReg.register);
router.post("/login", userValidate.validationLogin, userLog.login);
// function CRUD
//getOne
router.get("/getOneUser/:id", Auth.authRoutes, userGetOne.getOneUser);
//getAll
router.get("/getAllUsers", Auth.authRoutes, userGetAll.getAllUser);
//modify
router.put("/modifyUser/", Auth.authRoutes, userModify.modifyUser);
//delete
router.delete('/deleteUser/', Auth.authRoutes, userDelete.deleteUser);


module.exports = router;