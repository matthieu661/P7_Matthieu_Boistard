const express = require('express');
const router = express.Router();
const userReg = require("../controllers/Account/userRegister");
const userLog = require("../controllers/Account/userLogin");

router.post("/register", userReg.register );
router.post("/login", userLog.login );

module.exports = router;