const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userCtrl");

//router onject
const router = express.Router();

//routes


//REGISTER
router.post("/register", registerController);

//LOGIN ||POST
router.post("/login", loginController);


module.exports = router;
